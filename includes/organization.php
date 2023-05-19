<?php

class NutritionNavigatorOrganizations {
	const POST_SLUG = 'organizations';

	public function __construct() {
		// WordPress action hooks
		add_action('init', [$this, 'init']);
		add_action('add_meta_boxes', [$this, 'add_meta_boxes'], 10, 2);
		add_action('save_post', [$this, 'save_post'], 10, 3);
	}

	public function init() {
		$this->register_post_type();
		$this->register_custom_meta_fields();
	}

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
			'public' => false,
			'show_ui' => true,
			'has_archive' => false,
			'show_in_rest' => true,
			'capability_type' => 'post',
			'rewrite' => [
				'with_front' => false
			],
			'supports' => ['title', 'revisions', 'thumbnail', 'custom-fields']
		]);
	}

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
	 * @param WP_Post $post
	 *
	 * @return void
	 */
	public function organization_meta_box($post) {
		$website = $this->get_organization_website($post);

		echo '<p>';
		echo '<label for="organization-website">Website</label>';
		echo '<input type="text" id="organization-website" value="' .
			$website .
			'" name="organization-website" class="widefat" placeholder="https://www.google.com"/>';
		echo '</p>';
	}

	/**
	 * @param WP_Post $post
	 *
	 * @return void
	 */
	public function contact_meta_box($post) {
		$contact_email = $this->get_organization_contact_email($post);

		echo '<p>';
		echo '<label for="organization-contact-email">Email Address</label>';
		echo '<input type="text" id="organization-contact-email" value="' .
			$contact_email .
			'" name="organization-contact-email" class="widefat" placeholder="test@google.com"/>';
		echo '</p>';

		$contact_phone = $this->get_organization_contact_phone($post);

		echo '<p>';
		echo '<label for="organization-contact-phone">Phone Number</label>';
		echo '<input type="text" id="organization-contact-phone" value="' .
			$contact_phone .
			'" name="organization-contact-phone" class="widefat" placeholder="(999) 999-9999"/>';
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

		// Save/update Organization Website
		if (array_key_exists('organization-website', $_POST)) {
			update_post_meta($post_id, 'organization-website', $_POST['organization-website']);
		}

		// Save/update Organization Contact Email
		if (array_key_exists('organization-contact-email', $_POST)) {
			update_post_meta($post_id, 'organization-contact-email', $_POST['organization-contact-email']);
		}

		// Save/update Organization Contact Phone
		if (array_key_exists('organization-contact-phone', $_POST)) {
			update_post_meta($post_id, 'organization-contact-phone', $_POST['organization-contact-phone']);
		}
	}

	/**
	 * A getter for an Organization's Website field
	 *
	 * @param WP_Post $post
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
	 * @param WP_Post $post
	 *
	 * @return void
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
	 * @param WP_Post $post
	 *
	 * @return void
	 */
	public function get_organization_contact_phone($post) {
		$phone = get_post_meta($post->ID, 'organization-contact-phone', true);

		if (empty($phone)) {
			$phone = '';
		}

		return $phone;
	}
}

new NutritionNavigatorOrganizations();
