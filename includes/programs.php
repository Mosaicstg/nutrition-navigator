<?php

class NutritionNavigatorPrograms {
	const POST_SLUG = 'programs';
	const POST_REWRITE_SLUG = 'programs';

	const PROGRAM_TYPE_TAXONOMY_SLUG = 'program-type';
	const VENUE_TAXONOMY_SLUG = 'venue';
	const AUDIENCE_TAXONOMY_SLUG = 'audience';

	public function __construct() {
		// WordPress action hooks
		add_action('init', [$this, 'init']);
		add_action('add_meta_boxes', [$this, 'add_meta_boxes'], 10, 2);
		add_action('save_post', [$this, 'save_post'], 10, 3);
	}

	public function init() {
		$this->register_taxonomies();
		$this->register_post_type();
		$this->register_post_meta_fields();
	}

	public function register_taxonomies() {
		// Program Type
		register_taxonomy(self::PROGRAM_TYPE_TAXONOMY_SLUG, self::POST_SLUG, [
			'labels' => [
				'name' => __('Program Types', 'nutrition-navigator'),
				'singular_name' => __('Program Type', 'nutrition-navigator'),
				'all_items' => __('All Program Types', 'nutrition-navigator'),
				'add_item' => __('Add Program Type', 'nutrition-navigator'),
				'edit_item' => __('Edit Program Type', 'nutrition-navigator'),
				'view_item' => __('View Program Type', 'nutrition-navigator'),
				'update_item' => __('Update Program Type', 'nutrition-navigator'),
				'add_new_item' => __('Add Program Type', 'nutrition-navigator'),
				'not_found' => __('No Program Type found', 'nutrition-navigator')
			],
			'public' => false,
			'show_ui' => true,
			'has_archive' => false,
			'hierarchical' => true,
			'show_in_rest' => true,
			'show_in_nav_menus' => false
		]);

		// Venue
		register_taxonomy(self::VENUE_TAXONOMY_SLUG, self::POST_SLUG, [
			'labels' => [
				'name' => __('Venues', 'nutrition-navigator'),
				'singular_name' => __('Venue', 'nutrition-navigator'),
				'all_items' => __('All Venues', 'nutrition-navigator'),
				'add_item' => __('Add Venue', 'nutrition-navigator'),
				'edit_item' => __('Edit Venue', 'nutrition-navigator'),
				'view_item' => __('View Venue', 'nutrition-navigator'),
				'update_item' => __('Update Venue', 'nutrition-navigator'),
				'add_new_item' => __('Add Venue', 'nutrition-navigator'),
				'not_found' => __('No Venues found', 'nutrition-navigator')
			],
			'public' => false,
			'show_ui' => true,
			'has_archive' => false,
			'hierarchical' => true,
			'show_in_rest' => true,
			'show_in_nav_menus' => false
		]);

		// Audiences
		register_taxonomy(self::AUDIENCE_TAXONOMY_SLUG, self::POST_SLUG, [
			'labels' => [
				'name' => __('Audiences', 'nutrition-navigator'),
				'singular_name' => __('Audience', 'nutrition-navigator'),
				'all_items' => __('All Audiences', 'nutrition-navigator'),
				'add_item' => __('Add Audience', 'nutrition-navigator'),
				'edit_item' => __('Edit Audience', 'nutrition-navigator'),
				'view_item' => __('View Audience', 'nutrition-navigator'),
				'update_item' => __('Update Audience', 'nutrition-navigator'),
				'add_new_item' => __('Add Audience', 'nutrition-navigator'),
				'not_found' => __('No Audiences found', 'nutrition-navigator')
			],
			'public' => false,
			'show_ui' => true,
			'has_archive' => false,
			'hierarchical' => true,
			'show_in_rest' => true,
			'show_in_nav_menus' => false
		]);
	}

	public function register_post_type() {
		register_post_type(self::POST_SLUG, [
			'labels' => [
				'name' => __('Programs', 'nutrition-navigator'),
				'singular_name' => __('Program', 'nutrition-navigator'),
				'all_items' => __('All Programs', 'nutrition-navigator'),
				'add_item' => __('Add Program', 'nutrition-navigator'),
				'edit_item' => __('Edit Program', 'nutrition-navigator'),
				'view_item' => __('View Program', 'nutrition-navigator'),
				'update_item' => __('Update Program', 'nutrition-navigator'),
				'add_new_item' => __('Add Program', 'nutrition-navigator'),
				'not_found' => __('No Programs found', 'nutrition-navigator')
			],
			'menu_icon' => 'dashicons-location',
			'public' => false,
			'show_ui' => true,
			'has_archive' => false,
			'taxonomies' => [self::PROGRAM_TYPE_TAXONOMY_SLUG, self::VENUE_TAXONOMY_SLUG, self::AUDIENCE_TAXONOMY_SLUG],
			'show_in_rest' => true,
			'capability_type' => 'post',
			'rewrite' => [
				'slug' => self::POST_REWRITE_SLUG,
				'with_front' => false
			],
			'supports' => ['title', 'revisions', 'thumbnail', 'custom-fields']
		]);
	}

	public function register_post_meta_fields() {
		// Location Name
		register_post_meta(self::POST_SLUG, 'program-location-name', [
			'type' => 'string',
			'single' => true,
			'show_in_rest' => true
		]);

		// Location Address
		register_post_meta(self::POST_SLUG, 'program-location-address', [
			'type' => 'string',
			'single' => true,
			'show_in_rest' => true
		]);

		// Location Latitude
		register_post_meta(self::POST_SLUG, 'program-location-latitude', [
			'type' => 'string',
			'single' => true,
			'show_in_rest' => true
		]);

		// Location Longitude
		register_post_meta(self::POST_SLUG, 'program-location-longitude', [
			'type' => 'string',
			'single' => true,
			'show_in_rest' => true
		]);

		// Description
		register_post_meta(self::POST_SLUG, 'program-description', [
			'type' => 'string',
			'single' => true,
			'show_in_rest' => true
		]);

		// Contact Phone
		register_post_meta(self::POST_SLUG, 'program-contact-phone', [
			'type' => 'string',
			'single' => true,
			'show_in_rest' => true
		]);

		// Contact Email
		register_post_meta(self::POST_SLUG, 'program-contact-email', [
			'type' => 'string',
			'single' => true,
			'show_in_rest' => true
		]);
	}

	/**
	 * Taps into the `add_meta_boxes` WP action hook to render custom meta boxes for Programs post type
	 *
	 * @param string  $post_type
	 * @param WP_Post $post
	 *
	 * @return void
	 */
	public function add_meta_boxes($post_type, $post) {
		if (empty($post)) {
			return;
		}

		if (self::POST_SLUG !== $post_type) {
			return;
		}

		// Program meta box
		add_meta_box('program-information', 'Program', [$this, 'program_meta_box'], self::POST_SLUG, 'normal', 'high');

		// Location meta box
		add_meta_box(
			'location-information',
			'Location',
			[$this, 'location_meta_box'],
			self::POST_SLUG,
			'normal',
			'high'
		);

		// Contact Information
		add_meta_box('contact-information', 'Contact', [$this, 'contact_meta_box'], self::POST_SLUG, 'normal', 'high');
	}

	/**
	 * Render 'Program' meta box fields
	 *
	 * @return void
	 */
	public function program_meta_box($post) {
		$description = $this->get_program_description($post);

		echo '<p><label>Description</label></p>';
		wp_editor($description, self::POST_SLUG . '-program-description', [
			'textarea_name' => 'program-description',
			'textarea_rows' => 5
		]);
	}

	/**
	 * Render 'Location' meta box fields
	 *
	 * @param WP_Post $post
	 *
	 * @return void
	 */
	public function location_meta_box($post) {
		$location_name = $this->get_program_location_name($post);

		echo '<p>';
		echo '<label for="program-location-name">Name</label>';
		echo '<input type="text" id="program-location-name" value="' .
			$location_name .
			'" name="program-location-name" class="widefat" placeholder="Location Name"/>';
		echo '</p>';

		$location_address = $this->get_program_location_address($post);

		echo '<p>';
		echo '<label for="program-location-address">Address</label>';
		echo '<input type="text" id="program-location-address" value="' .
			$location_address .
			'" name="program-location-address" class="widefat" placeholder="123 Placeholder Lane"/>';
		echo '</p>';

		$latitude = $this->get_program_location_latitude($post);

		echo '<p>';
		echo '<label for="program-location-latitude">Latitude <span style="color:red; font-weight: bold">*</span></label>';
		echo '<input type="text" id="program-location-latitude" value="' .
			$latitude .
			'" name="program-location-latitude" class="widefat" placeholder="-99.222" required/>';
		echo '</p>';

		$longitude = $this->get_program_location_longitude($post);

		echo '<p>';
		echo '<label for="program-location-longitude">Longitude <span style="color:red; font-weight: bold">*</span></label>';
		echo '<input type="text" id="program-location-longitude" value="' .
			$longitude .
			'" name="program-location-longitude" class="widefat" placeholder="-99.22" required/>';
		echo '</p>';
	}

	/**
	 * Render 'Contact' meta box fields
	 *
	 * @param WP_Post $post
	 *
	 * @return void
	 */
	public function contact_meta_box($post) {
		$phone = $this->get_program_contact_phone($post);

		echo '<p>';
		echo '<label for="program-contact-phone">Phone Number:</label>';
		echo '<input type="text" id="program-contact-phone" value="' .
			$phone .
			'" name="program-contact-phone" class="widefat" placeholder="(999) 999-9999"/>';
		echo '</p>';

		$email = $this->get_program_contact_email($post);

		echo '<p>';
		echo '<label for="program-contact-email">Email:</label>';
		echo '<input type="text" id="program-contact-email" value="' .
			$email .
			'" name="program-contact-email" class="widefat" placeholder="test@google.com"/>';
		echo '</p>';
	}

	/**
	 * Taps into the `save_post` WP action hook to save custom meta fields
	 *
	 * @param int     $post_id
	 * @param WP_Post $post
	 * @param bool    $update
	 *
	 * @return void
	 */
	public function save_post($post_id, $post, $update) {
		// Check permissions
		if (
			(array_key_exists('post_type', $_POST) && self::POST_SLUG !== $_POST['post_type']) ||
			!current_user_can('edit_post', $post_id)
		) {
			return;
		}

		// verify if this is an auto save routine. If it is our form has not been submitted, so we don't want
		// to do anything
		if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
			return;
		}

		// Save/update Program Description
		if (array_key_exists('program-description', $_POST)) {
			update_post_meta($post_id, 'program-description', $_POST['program-description']);
		}

		// Save/update Program Location Name
		if (array_key_exists('program-location-name', $_POST)) {
			update_post_meta($post_id, 'program-location-name', $_POST['program-location-name']);
		}

		// Save/update Program Location Address
		if (array_key_exists('program-location-address', $_POST)) {
			update_post_meta($post_id, 'program-location-address', $_POST['program-location-address']);
		}

		// Save/update Program Location Latitude
		if (array_key_exists('program-location-latitude', $_POST)) {
			update_post_meta($post_id, 'program-location-latitude', $_POST['program-location-latitude']);
		}

		// Save/update Program Location Latitude
		if (array_key_exists('program-location-longitude', $_POST)) {
			update_post_meta($post_id, 'program-location-longitude', $_POST['program-location-longitude']);
		}

		// Save/update Program Contact Phone
		if (array_key_exists('program-contact-phone', $_POST)) {
			update_post_meta($post_id, 'program-contact-phone', $_POST['program-contact-phone']);
		}

		// Save/update Program Contact Email
		if (array_key_exists('program-contact-email', $_POST)) {
			update_post_meta($post_id, 'program-contact-email', $_POST['program-contact-email']);
		}
	}

	/**
	 * A getter for a Program's description
	 *
	 * @param WP_Post $post
	 *
	 * @return string
	 */
	public function get_program_description($post) {
		$description = get_post_meta($post->ID, 'program-description', true);

		if (empty($description)) {
			$description = '';
		}

		return $description;
	}

	/**
	 * A getter for a Program's location name
	 *
	 * @param WP_Post $post
	 *
	 * @return string
	 */
	public function get_program_location_name($post) {
		$name = get_post_meta($post->ID, 'program-location-name', true);

		if (empty($name)) {
			$name = '';
		}

		return $name;
	}

	/**
	 * A getter for a Program's location address
	 *
	 * @param WP_Post $post
	 *
	 * @return string
	 */
	public function get_program_location_address($post) {
		$address = get_post_meta($post->ID, 'program-location-address', true);

		if (empty($address)) {
			$address = '';
		}

		return $address;
	}

	/**
	 * A getter for a Program's location latitude
	 *
	 * @param WP_Post $post
	 *
	 * @return string
	 */
	public function get_program_location_latitude($post) {
		$latitude = get_post_meta($post->ID, 'program-location-latitude', true);

		if (empty($latitude)) {
			$latitude = '';
		}

		return $latitude;
	}

	/**
	 * A getter for a Program's location longitude
	 *
	 * @param WP_Post $post
	 *
	 * @return string
	 */
	public function get_program_location_longitude($post) {
		$longitude = get_post_meta($post->ID, 'program-location-longitude', true);

		if (empty($longitude)) {
			$longitude = '';
		}

		return $longitude;
	}

	/**
	 * A getter for a Program's contact phone number
	 *
	 * @param WP_Post $post
	 *
	 * @return string
	 */
	public function get_program_contact_phone($post) {
		$phone = get_post_meta($post->ID, 'program-contact-phone', true);

		if (empty($phone)) {
			$phone = '';
		}

		return $phone;
	}

	/**
	 * A getter for a Program's contact email
	 *
	 * @param WP_Post $post
	 *
	 * @return string
	 */
	public function get_program_contact_email($post) {
		$email = get_post_meta($post->ID, 'program-contact-email', true);

		if (empty($email)) {
			$email = '';
		}

		return $email;
	}
}

new NutritionNavigatorPrograms();
