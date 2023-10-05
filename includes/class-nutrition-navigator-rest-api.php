<?php
/**
 * Nutrition Navigator: REST API routes map
 *
 * @package Nutrition Navigator
 */

/**
 * Handle WP REST API routes needed for map functionality
 */
class Nutrition_Navigator_REST_API {
	const REST_API_BASE = 'nutrition-navigator/v1';

	/**
	 * Class constructor
	 */
	public function __construct() {
		add_action('rest_api_init', [$this, 'rest_api_init']);
	}

	/**
	 * Register new routes in the WP REST API.
	 *
	 * @return void
	 */
	public function rest_api_init() {
		register_rest_route(self::REST_API_BASE, 'programs', [
			'methods' => 'GET',
			'permission_callback' => '__return_true',
			'callback' => [$this, 'get_all_programs']
		]);
	}

	/**
	 * Get ALL programs.
	 *
	 * @param WP_REST_Request $request Request object when rest route is requested.
	 *
	 * @return WP_REST_Response
	 */
	public function get_all_programs($request) {
		$posts = get_posts([
			'post_type' => Nutrition_Navigator_Programs::POST_SLUG,
			'posts_per_page' => -1
		]);

		$data = [];

		foreach ($posts as $post) {
			$program_data = [];

			$program_data['id'] = $post->ID;
			$program_data['program-name'] = $post->post_title;
			$program_data['url'] = get_the_permalink($post);

			// Get all available post meta fields
			$program_meta = get_post_meta($post->ID, '', true);
			$program_meta = array_filter(
				$program_meta,
				function ($meta_value, $meta_key) {
					// Custom meta field keys will always be prefixed `program-`
					return false !== stripos($meta_key, 'program-');
				},
				ARRAY_FILTER_USE_BOTH
			);

			// Loop through available meta fields and add them to program data
			foreach ($program_meta as $key => $value) {
				// Remove prefixes from meta key
				$sanitized_key = str_replace(['program-', 'location-'], ['', ''], $key);

				// Meta field value can be returned as an array
				if (is_array($value)) {
					$value = $value[0];
				}

				// Skip certain meta fields to later handle individually
				if (
					'organization' === $sanitized_key ||
					'latitude' === $sanitized_key ||
					'longitude' === $sanitized_key
				) {
					continue;
				}

				$program_data[$sanitized_key] = $value;
			}

			$latitude = get_post_meta($post->ID, 'program-location-latitude', true);
			$longitude = get_post_meta($post->ID, 'program-location-longitude', true);

			$program_data['latitude'] = floatval($latitude);
			$program_data['longitude'] = floatval($longitude);

			// Get associated Organization post ID
			$program_organization_id = get_post_meta($post->ID, 'program-organization', true);

			if (!empty($program_organization_id)) {
				$organization = get_post($program_organization_id);

				if (!empty($organization)) {
					$program_data['organization-name'] = $organization->post_title;
					$program_data['organization-url'] = get_the_permalink($organization);
				}
			}

			$program_data['program-types'] = $this->get_program_program_types($post);
			$program_data['audiences'] = $this->get_program_audiences($post);
			$program_data['venues'] = $this->get_program_venues($post);
			$program_data['regions'] = $this->get_regions($post);
			$program_data['languages'] = $this->get_languages($post);

			if (isset($program_data['description'])) {
				$program_data['description'] = htmlentities2($program_data['description']);
			}

			$data[] = $program_data;
		}

		return $this->rest_send_response($request, $data, 200);
	}

	/**
	 * Get a Program's program types.
	 *
	 * @param WP_Post $post A Program post object.
	 *
	 * @return array
	 */
	public function get_program_program_types($post) {
		$program_types_taxonomy_terms = get_the_terms($post, Nutrition_Navigator_Programs::PROGRAM_TYPE_TAXONOMY_SLUG);
		$program_types = [];

		if (is_array($program_types_taxonomy_terms)) {
			foreach ($program_types_taxonomy_terms as $program_types_taxonomy_term) {
				$program_types[] = $program_types_taxonomy_term->slug;
			}
		}

		return $program_types;
	}

	/**
	 * Get a Program's audiences.
	 *
	 * @param WP_Post $post A Program post object.
	 *
	 * @return array
	 */
	public function get_program_audiences($post) {
		$audience_taxonomy_terms = get_the_terms($post, Nutrition_Navigator_Programs::AUDIENCE_TAXONOMY_SLUG);
		$audiences = [];

		if (is_array($audience_taxonomy_terms)) {
			foreach ($audience_taxonomy_terms as $audience_taxonomy_term) {
				$audiences[] = $audience_taxonomy_term->slug;
			}
		}

		return $audiences;
	}

	/**
	 * Get a Program's venues.
	 *
	 * @param WP_Post $post A Program post object.
	 *
	 * @return array
	 */
	public function get_program_venues($post) {
		$venue_taxonomy_terms = get_the_terms($post, Nutrition_Navigator_Programs::VENUE_TAXONOMY_SLUG);
		$venues = [];

		if (is_array($venue_taxonomy_terms)) {
			foreach ($venue_taxonomy_terms as $venue_taxonomy_term) {
				$venues[] = $venue_taxonomy_term->slug;
			}
		}

		return $venues;
	}

	/**
	 * Get a Program's region
	 *
	 * @param WP_Post $post A Programs post object.
	 *
	 * @return array
	 */
	public function get_regions($post) {
		$regions_taxonomy_terms = get_the_terms($post, Nutrition_Navigator_Programs::REGION_TAXONOMY_SLUG);
		$regions = [];

		if (is_array($regions_taxonomy_terms)) {
			foreach ($regions_taxonomy_terms as $region_taxonomy_term) {
				$regions[] = $region_taxonomy_term->slug;
			}
		}

		return $regions;
	}

	/**
	 * Get a Program's languages
	 *
	 * @param WP_Post $post A Programs post object.
	 *
	 * @return string[]
	 */
	public function get_languages($post) {
		$languages_taxonomy_terms = get_the_terms($post, Nutrition_Navigator_Programs::LANGUAGE_TAXONOMY_SLUG);
		$languages = [];

		if (is_array($languages_taxonomy_terms)) {
			foreach ($languages_taxonomy_terms as $languages_taxonomy_term) {
				$languages[] = $languages_taxonomy_term->slug;
			}
		}

		return $languages;
	}

	/**
	 * Handles creating a REST response object to send back to SlickText when a request is made via a webhook
	 *
	 * @param WP_REST_Request $request A WP REST Request object.
	 * @param mixed           $data    Object or data to send back.
	 * @param int             $code    Status code.
	 *
	 * @return WP_REST_Response
	 */
	public function rest_send_response($request, $data, $code) {
		return new WP_REST_Response($data, $code);
	}
}

new Nutrition_Navigator_REST_API();
