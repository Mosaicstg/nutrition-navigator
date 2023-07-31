<?php
/**
 * Nutrition Navigator: Create Organization custom post type
 *
 * @package Nutrition Navigator
 */

/**
 * Custom post type with custom meta fields.
 */
class Nutrition_Navigator_Organizations {
	const POST_SLUG = 'organizations';

	/**
	 * Class constructor
	 */
	public function __construct() {
		// WordPress action hooks
		add_action('init', [$this, 'init']);
		add_action('add_meta_boxes', [$this, 'add_meta_boxes'], 10, 2);
		add_action('save_post', [$this, 'save_post'], 10, 3);
	}

	/**
	 * Taps into the `init` WP action hook to register custom post type and respective custom meta fields
	 *
	 * @return void
	 */
	public function init() {
		$this->register_post_type();
		$this->register_custom_meta_fields();
	}

	/**
	 * Register Organizations custom post type
	 *
	 * @return void
	 */
	public function register_post_type() {
		register_post_type(self::POST_SLUG, [
			'labels' => [
				'name' => __('Organizations', 'nutrition-navigator'),
				'singular_name' => __('Organization', 'nutrition-navigator'),
				'all_items' => __('All Organizations', 'nutrition-navigator'),
				'add_item' => __('Add Organization', 'nutrition-navigator'),
				'edit_item' => __('Edit Organization', 'nutrition-navigator'),
				'view_item' => __('View Organization', 'nutrition-navigator'),
				'update_item' => __('Update Organization', 'nutrition-navigator'),
				'add_new_item' => __('Add Organization', 'nutrition-navigator'),
				'not_found' => __('No Organizations found', 'nutrition-navigator')
			],
			'menu_icon' => 'dashicons-groups',
			'public' => true,
			'show_ui' => true,
			'has_archive' => false,
			'show_in_rest' => true,
			'capability_type' => 'post',
			'rewrite' => [
				'with_front' => false
			],
			'supports' => ['title', 'thumbnail', 'custom-fields']
		]);
	}

	/**
	 * Register custom meta fields for Organizations post type
	 *
	 * @return void
	 */
	public function register_custom_meta_fields() {
		// Organization Website
		register_post_meta(self::POST_SLUG, 'organization-website', [
			'type' => 'string',
			'single' => true,
			'show_in_rest' => true
		]);

		// Organization Contact Email
		register_post_meta(self::POST_SLUG, 'organization-contact-email', [
			'type' => 'string',
			'single' => true,
			'show_in_rest' => true
		]);

		// Organization Contact Phone
		register_post_meta(self::POST_SLUG, 'organization-contact-phone', [
			'type' => 'string',
			'single' => true,
			'show_in_rest' => true
		]);
	}

	/**
	 * Taps into the `add_meta_boxes` WP action hook to render custom meta boxes for Organization post type
	 *
	 * @param string  $post_type Post type.
	 * @param WP_Post $post      Post object.
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

		// Organization meta box
		add_meta_box(
			'organization-information',
			'Organization',
			[$this, 'organization_meta_box'],
			self::POST_SLUG,
			'normal',
			'high'
		);

		// Contact meta box
		add_meta_box('contact-information', 'Contact', [$this, 'contact_meta_box'], self::POST_SLUG, 'normal', 'high');
	}

	/**
	 * Handle rendering fields in 'Organization' meta box
	 *
	 * @param WP_Post $post Post object.
	 *
	 * @return void
	 */
	public function organization_meta_box($post) {
		wp_nonce_field(plugin_basename(__FILE__), 'organization_nonce');

		$website = $this->get_organization_website($post);

		echo '<p>';
		echo '<label for="organization-website">Website</label>';
		echo '<input type="text" id="organization-website" value="' .
			esc_attr($website) .
			'" name="organization-website" class="widefat" placeholder="https://www.google.com"/>';
		echo '</p>';
	}

	/**
	 * Handle rendering fields in 'Contact' meta box
	 *
	 * @param WP_Post $post Post object.
	 *
	 * @return void
	 */
	public function contact_meta_box($post) {
		wp_nonce_field(plugin_basename(__FILE__), 'organization_contact_nonce');

		$contact_email = $this->get_organization_contact_email($post);

		echo '<p>';
		echo '<label for="organization-contact-email">Email Address</label>';
		echo '<input type="text" id="organization-contact-email" value="' .
			esc_attr($contact_email) .
			'" name="organization-contact-email" class="widefat" placeholder="test@google.com"/>';
		echo '</p>';

		$contact_phone = $this->get_organization_contact_phone($post);

		echo '<p>';
		echo '<label for="organization-contact-phone">Phone Number</label>';
		echo '<input type="text" id="organization-contact-phone" value="' .
			esc_attr($contact_phone) .
			'" name="organization-contact-phone" class="widefat" placeholder="(999) 999-9999"/>';
		echo '</p>';
	}

	/**
	 * Taps into the `save_post` WP action hook to save custom meta fields
	 *
	 * @param int     $post_id Post ID.
	 * @param WP_Post $post    Post object.
	 * @param bool    $update  A bool value is post is being updated or not.
	 *
	 * @return void
	 */
	public function save_post($post_id, $post, $update) {
		// Verify meta box nonce
		if (
			isset($_POST['organization_nonce']) &&
			isset($_POST['organization_contact_nonce']) &&
			!wp_verify_nonce(
				sanitize_text_field(wp_unslash($_POST['organization_nonce'])),
				plugin_basename(__FILE__)
			) &&
			!wp_verify_nonce(
				sanitize_text_field(wp_unslash($_POST['organization_contact_nonce'])),
				plugin_basename(__FILE__)
			)
		) {
			return;
		}

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

		// Save/update Organization Website
		if (array_key_exists('organization-website', $_POST)) {
			update_post_meta(
				$post_id,
				'organization-website',
				sanitize_text_field(wp_unslash($_POST['organization-website']))
			);
		}

		// Save/update Organization Contact Email
		if (array_key_exists('organization-contact-email', $_POST)) {
			update_post_meta(
				$post_id,
				'organization-contact-email',
				sanitize_text_field(wp_unslash($_POST['organization-contact-email']))
			);
		}

		// Save/update Organization Contact Phone
		if (array_key_exists('organization-contact-phone', $_POST)) {
			update_post_meta(
				$post_id,
				'organization-contact-phone',
				sanitize_text_field(wp_unslash($_POST['organization-contact-phone']))
			);
		}
	}

	/**
	 * A getter for an Organization's Website field
	 *
	 * @param WP_Post $post Post object.
	 *
	 * @return string
	 */
	public function get_organization_website($post) {
		$website = get_post_meta($post->ID, 'organization-website', true);

		if (empty($website)) {
			$website = '';
		}

		return $website;
	}

	/**
	 * A getter for an Organization's Contact Email field
	 *
	 * @param WP_Post $post Post object.
	 *
	 * @return string
	 */
	public function get_organization_contact_email($post) {
		$email = get_post_meta($post->ID, 'organization-contact-email', true);

		if (empty($email)) {
			$email = '';
		}

		return $email;
	}

	/**
	 * A getter for an Organization's Contact Phone field
	 *
	 * @param WP_Post $post Post object.
	 *
	 * @return string
	 */
	public function get_organization_contact_phone($post) {
		$phone = get_post_meta($post->ID, 'organization-contact-phone', true);

		if (empty($phone)) {
			$phone = '';
		}

		return $phone;
	}
}

new Nutrition_Navigator_Organizations();
