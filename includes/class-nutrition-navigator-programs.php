<?php
/**
 * Nutrition Navigator: "Programs" custom post type
 *
 * @package Nutrition Navigator
 */

/**
 * TODO: Expose "archive" feed for Program Type taxonomy
 *
 * Create custom post type 'Programs', taxonomies and meta fields
 */
class Nutrition_Navigator_Programs {
	const POST_SLUG = 'programs';

	const POST_REWRITE_SLUG = 'programs';

	const PROGRAM_TYPE_TAXONOMY_SLUG = 'program-type';

	const VENUE_TAXONOMY_SLUG = 'venue';

	const AUDIENCE_TAXONOMY_SLUG = 'audience';

	const METRO_AREA_TAXONOMY_SLUG = 'metro-area';

	/**
	 * Class constructor
	 */
	public function __construct() {
		// WordPress filter hooks
		add_filter('manage_edit-' . self::PROGRAM_TYPE_TAXONOMY_SLUG . '_columns', [
			$this,
			'manage_edit_program_type_columns'
		]);
		add_filter(
			'manage_' . self::PROGRAM_TYPE_TAXONOMY_SLUG . '_custom_column',
			[$this, 'manage_program_type_custom_column'],
			10,
			3
		);

		// WordPress action hooks
		add_action('init', [$this, 'init']);
		add_action('add_meta_boxes', [$this, 'add_meta_boxes'], 10, 2);
		add_action('save_post', [$this, 'save_post'], 10, 3);
		add_action('admin_enqueue_scripts', [$this, 'admin_enqueue_scripts']);
		add_action(
			self::PROGRAM_TYPE_TAXONOMY_SLUG . '_edit_form_fields',
			[$this, 'program_type_edit_form_fields'],
			10,
			2
		);
		add_action('edited_' . self::PROGRAM_TYPE_TAXONOMY_SLUG, [$this, 'edited_program_type'], 10, 3);
	}

	/**
	 * Taps into the `manage_edit_program-type_columns` WP filter hook to add custom columns in admin screen when
	 * viewing all Program Types
	 *
	 * @param array $columns An array of all columns in view all of the taxonomy terms.
	 *
	 * @return array
	 */
	public function manage_edit_program_type_columns($columns) {
		$columns['icon'] = 'Icon';

		return $columns;
	}

	/**
	 * Taps into the `manage_program_type_custom_column` to render HTML for custom column.
	 *
	 * @param string $string      String HTML content of column.
	 * @param string $column_name Slug of current column that's to render.
	 * @param int    $term_id     Current taxonomy term ID.
	 *
	 * @return string
	 */
	public function manage_program_type_custom_column($string, $column_name, $term_id) {
		$icon = $this->get_program_type_icon($term_id);

		if ('icon' === $column_name && !empty($icon)) {
			$string = '<img src="' . esc_url($icon) . '" alt="" style="max-width: 100%;"/>';
		}

		return $string;
	}

	/**
	 * Taps into the `init` WP action hook to register post type, taxonomies and custom meta fields
	 *
	 * @return void
	 */
	public function init() {
		$this->register_taxonomies();
		$this->register_taxonomy_meta_fields();
		$this->register_post_type();
		$this->register_post_meta_fields();
	}

	/**
	 * Register custom taxonomies for Programs custom post type
	 *
	 * @return void
	 */
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
			'public' => true,
			'show_ui' => true,
			'has_archive' => true,
			'hierarchical' => true,
			'show_in_rest' => true,
			'show_in_nav_menus' => false,
			'show_admin_column' => true
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
			'show_in_nav_menus' => false,
			'show_admin_column' => true
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
			'show_in_nav_menus' => false,
			'show_admin_column' => true
		]);

		register_taxonomy(self::METRO_AREA_TAXONOMY_SLUG, self::POST_SLUG, [
			'labels' => [
				'name' => __('Metro Areas', 'nutrition-navigator'),
				'singular_name' => __('Metro Area', 'nutrition-navigator'),
				'all_items' => __('All Metro Areas', 'nutrition-navigator'),
				'add_item' => __('Add Metro Area', 'nutrition-navigator'),
				'edit_item' => __('Edit Metro Area', 'nutrition-navigator'),
				'view_item' => __('View Metro Area', 'nutrition-navigator'),
				'update_item' => __('Update Metro Area', 'nutrition-navigator'),
				'add_new_item' => __('Add Metro Area', 'nutrition-navigator'),
				'not_found' => __('No Metro Areas found', 'nutrition-navigator')
			],
			'public' => false,
			'show_ui' => true,
			'has_archive' => false,
			'hierarchical' => true,
			'show_in_rest' => true,
			'show_in_nav_menus' => false,
			'show_admin_column' => true
		]);
	}

	/**
	 * Register custom meta fields for taxonomies
	 *
	 * @return void
	 */
	public function register_taxonomy_meta_fields() {
		// Icon field for Program Type
		register_term_meta(self::PROGRAM_TYPE_TAXONOMY_SLUG, 'icon', [
			'type' => 'string',
			'single' => true,
			'default' => '',
			'show_in_rest' => true
		]);
	}

	/**
	 * Register 'Programs' custom post type
	 *
	 * @return void
	 */
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
			'public' => true,
			'show_ui' => true,
			'has_archive' => false,
			'taxonomies' => [self::PROGRAM_TYPE_TAXONOMY_SLUG, self::VENUE_TAXONOMY_SLUG, self::AUDIENCE_TAXONOMY_SLUG],
			'show_in_rest' => true,
			'capability_type' => 'post',
			'rewrite' => [
				'with_front' => false
			],
			'supports' => ['title', 'thumbnail', 'custom-fields', 'author']
		]);
	}

	/**
	 * Register custom post meta fields for 'Programs' custom post type
	 *
	 * @return void
	 */
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
			'type' => 'number',
			'single' => true,
			'show_in_rest' => true,
			'sanitize_callback' => [$this, 'sanitize_map_position_custom_fields']
		]);

		// Location Longitude
		register_post_meta(self::POST_SLUG, 'program-location-longitude', [
			'type' => 'number',
			'single' => true,
			'show_in_rest' => true,
			'sanitize_callback' => [$this, 'sanitize_map_position_custom_fields']
		]);

		// Location Zip Code
		register_post_meta(self::POST_SLUG, 'program-location-zip-code', [
			'type' => 'integer',
			'single' => true,
			'show_in_rest' => true
		]);

		// Location Dates/times offered
		register_post_meta(self::POST_SLUG, 'program-location-dates-times-offered', [
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

		// Download File ID
		register_post_meta(self::POST_SLUG, 'program-download-file-id', [
			'type' => 'integer',
			'single' => true,
			'show_in_rest' => true,
			'sanitized_callback' => [$this, 'sanitize_download_file_id_custom_field']
		]);
	}

	/**
	 * A sanitizer function for the latitude field.
	 *
	 * @param mixed  $meta_value     Metadata value to sanitize.
	 * @param string $meta_key       Metadata key.
	 * @param string $object_type    Type of object metadata is for. Accepts 'post', 'comment', 'term', 'user',
	 *                               or any other object type with an associated meta table.
	 * @param string $object_subtype Object subtype.
	 *
	 * @return float
	 */
	public function sanitize_map_position_custom_fields($meta_value, $meta_key, $object_type, $object_subtype) {
		return floatval($meta_value);
	}

	/**
	 * A sanitizer function for the latitude field.
	 *
	 * @param mixed  $meta_value     Metadata value to sanitize.
	 * @param string $meta_key       Metadata key.
	 * @param string $object_type    Type of object metadata is for. Accepts 'post', 'comment', 'term', 'user',
	 *                               or any other object type with an associated meta table.
	 * @param string $object_subtype Object subtype.
	 *
	 * @return integer
	 */
	public function sanitize_download_file_id_custom_field($meta_value, $meta_key, $object_type, $object_subtype) {
		return intval($meta_value);
	}

	/**
	 * Taps into the `add_meta_boxes` WP action hook to render custom meta boxes for Programs post type
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

		// File Upload meta box
		add_meta_box(
			'download-file-information',
			'Files',
			[$this, 'download_file_meta_box'],
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
	 * @param WP_Post $post Post object.
	 *
	 * @return void
	 */
	public function program_meta_box($post) {
		wp_nonce_field(plugin_basename(__FILE__), 'program_nonce');

		$organizations = $this->get_current_organizations();

		if (!empty($organizations)) {
			$organization = $this->get_program_organization($post);

			echo '<p>';
			echo '<label class="program-organization">Organization: <span style="color: red; font-weight: bold">*</span></label>';
			echo '<select id="program-organization" name="program-organization" class="widefat" required>';
			echo '<option value="">Select Organization..</option>';

			foreach ($organizations as $index => $organization_title) {
				echo '<option value="' .
					esc_attr($index) .
					'" ' .
					(is_int(intval($organization)) && intval($organization) === $index ? 'selected' : '') .
					'>';
				echo esc_html($organization_title);
				echo '</option>';
			}

			echo '</select>';
			echo '<small>This field will be available as long as there are published Organization posts.</small>';
			echo '</p>';
		}

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
	 * @param WP_Post $post Post object.
	 *
	 * @return void
	 */
	public function location_meta_box($post) {
		wp_nonce_field(plugin_basename(__FILE__), 'program_location_nonce');

		$location_name = $this->get_program_location_name($post);

		echo '<p>';
		echo '<label for="program-location-name">Name</label>';
		echo '<input type="text" id="program-location-name" value="' .
			esc_attr($location_name) .
			'" name="program-location-name" class="widefat" placeholder="Location Name"/>';
		echo '</p>';

		$location_address = $this->get_program_location_address($post);

		echo '<p>';
		echo '<label for="program-location-address">Address</label>';
		echo '<input type="text" id="program-location-address" value="' .
			esc_attr($location_address) .
			'" name="program-location-address" class="widefat" placeholder="123 Placeholder Lane"/>';
		echo '</p>';

		$latitude = $this->get_program_location_latitude($post);

		echo '<p>';
		echo '<label for="program-location-latitude">Latitude</label>';
		echo '<input type="text" id="program-location-latitude" value="' .
			esc_attr($latitude) .
			'" name="program-location-latitude" class="widefat" placeholder="-99.222"/>';
		echo '</p>';

		$longitude = $this->get_program_location_longitude($post);

		echo '<p>';
		echo '<label for="program-location-longitude">Longitude</label>';
		echo '<input type="text" id="program-location-longitude" value="' .
			esc_attr($longitude) .
			'" name="program-location-longitude" class="widefat" placeholder="-99.22"/>';
		echo '</p>';

		$zip_code = $this->get_program_location_zip_code($post);

		echo '<p>';
		echo '<label for="program-location-zip-code">Zip Code</label><br/>';
		echo '<input type="number" id="program-location-zip-code" value="' .
			esc_attr($zip_code) .
			'" name="program-location-zip-code" class="" placeholder="20001"/>';
		echo '</p>';

		$dates_times_offered = $this->get_program_dates_times_offered($post);

		echo '<p><label>Dates/times offered</label></p>';
		wp_editor($dates_times_offered, self::POST_SLUG . '-program-location-dates-times-offered', [
			'textarea_name' => 'program-location-dates-times-offered',
			'textarea_rows' => 5
		]);
	}

	/**
	 * Render 'Down' meta box fields
	 *
	 * @param WP_Post $post Post object.
	 *
	 * @return void
	 */
	public function download_file_meta_box($post) {
		wp_nonce_field(plugin_basename(__FILE__), 'program_download_file_nonce');

		$download_file_id = get_post_meta($post->ID, 'program-download-file-id', true);
		$file_path = get_attached_file($download_file_id);
		$file_name = !empty($file_path) ? basename($file_path) : '';

		echo '<p>Download File:</p>';
		echo '<div class="file-actions-container" style="display: flex; flex-flow: row nowrap; grid-gap: 10px; align-items: center">';

		// File Name container
		echo '<span style="color: #2271b1;" class="file-name-container ' .
			(empty($download_file_id) ? 'hidden' : '') .
			'">' .
			esc_html($file_name) .
			'</span>';

		// Select File Button
		echo '<button type="button" aria-label="Select File" style="margin-right: 10px;" class="button ' .
			(!empty($download_file_id) ? 'hidden' : '') .
			' upload-program-file">';
		echo '<span style="display: inline-block; margin-right: 5px; vertical-align: middle">Select File</span><span style="vertical-align: middle" class="dashicons dashicons-cloud-upload"></span>';
		echo '</button>';

		// Remove File button
		echo '<button type="button" aria-label="Remove File" class="button ' .
			(empty($download_file_id) ? 'hidden' : '') .
			' delete-program-file"><span style="vertical-align: middle" class="dashicons dashicons-trash"></span></button>';

		// Hidden field that with hold ID of attachment post of file.
		echo '<input type="hidden" class="file-attachment-id" name="program-download-file-id" value="' .
			esc_attr($download_file_id) .
			'"/>';

		echo '</div>';
	}

	/**
	 * Render 'Contact' meta box fields
	 *
	 * @param WP_Post $post Post object.
	 *
	 * @return void
	 */
	public function contact_meta_box($post) {
		wp_nonce_field(plugin_basename(__FILE__), 'program_contact_nonce');

		$phone = $this->get_program_contact_phone($post);

		echo '<p>';
		echo '<label for="program-contact-phone">Phone Number:</label>';
		echo '<input type="text" id="program-contact-phone" value="' .
			esc_attr($phone) .
			'" name="program-contact-phone" class="widefat" placeholder="(999) 999-9999"/>';
		echo '</p>';

		$email = $this->get_program_contact_email($post);

		echo '<p>';
		echo '<label for="program-contact-email">Email:</label>';
		echo '<input type="text" id="program-contact-email" value="' .
			esc_attr($email) .
			'" name="program-contact-email" class="widefat" placeholder="test@google.com"/>';
		echo '</p>';
	}

	/**
	 * Taps into the `save_post` WP action hook to save custom meta fields
	 *
	 * @param int     $post_id Post ID.
	 * @param WP_Post $post    Post object.
	 * @param bool    $update  A bool flag is post is being updated or not.
	 *
	 * @return void
	 */
	public function save_post($post_id, $post, $update) {
		// Verify meta box nonce
		if (
			isset($_POST['program_nonce']) &&
			isset($_POST['program_location_nonce']) &&
			isset($_POST['program_download_file_none']) &&
			isset($_POST['program_contact_nonce']) &&
			!wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['program_nonce'])), plugin_basename(__FILE__)) &&
			!wp_verify_nonce(
				sanitize_text_field(wp_unslash($_POST['program_location_nonce'])),
				plugin_basename(__FILE__)
			) &&
			!wp_verify_nonce(
				sanitize_text_field(wp_unslash($_POST['program_download_file_none'])),
				plugin_basename(__FILE__)
			) &&
			!wp_verify_nonce(
				sanitize_text_field(wp_unslash($_POST['program_contact_nonce'])),
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

		// Save/update Program Description
		if (array_key_exists('program-organization', $_POST)) {
			update_post_meta(
				$post_id,
				'program-organization',
				sanitize_text_field(wp_unslash($_POST['program-organization']))
			);
		}

		// Save/update Program Description
		if (array_key_exists('program-description', $_POST)) {
			update_post_meta(
				$post_id,
				'program-description',
				// This fields is a WYSIWYG
				sanitize_textarea_field(wp_unslash($_POST['program-description']))
			);
		}

		// Save/update Program Location Name
		if (array_key_exists('program-location-name', $_POST)) {
			update_post_meta(
				$post_id,
				'program-location-name',
				sanitize_text_field(wp_unslash($_POST['program-location-name']))
			);
		}

		// Save/update Program Location Address
		if (array_key_exists('program-location-address', $_POST)) {
			update_post_meta(
				$post_id,
				'program-location-address',
				sanitize_text_field(wp_unslash($_POST['program-location-address']))
			);
		}

		// Save/update Program Location Latitude
		if (array_key_exists('program-location-latitude', $_POST)) {
			update_post_meta(
				$post_id,
				'program-location-latitude',
				floatval(sanitize_text_field(wp_unslash($_POST['program-location-latitude'])))
			);
		}

		// Save/update Program Location Longitude
		if (array_key_exists('program-location-longitude', $_POST)) {
			update_post_meta(
				$post_id,
				'program-location-longitude',
				floatval(sanitize_text_field(wp_unslash($_POST['program-location-longitude'])))
			);
		}

		// Save/update Program Location Zip Code
		if (array_key_exists('program-location-zip-code', $_POST)) {
			update_post_meta(
				$post_id,
				'program-location-zip-code',
				sanitize_text_field(wp_unslash($_POST['program-location-zip-code']))
			);
		}

		if (array_key_exists('program-location-dates-times-offered', $_POST)) {
			update_post_meta(
				$post_id,
				'program-location-dates-times-offered',
				sanitize_textarea_field(wp_unslash($_POST['program-location-dates-times-offered']))
			);
		}

		// Save/update Program Contact Phone
		if (array_key_exists('program-contact-phone', $_POST)) {
			update_post_meta(
				$post_id,
				'program-contact-phone',
				sanitize_text_field(wp_unslash($_POST['program-contact-phone']))
			);
		}

		// Save/update Program Contact Email
		if (array_key_exists('program-contact-email', $_POST)) {
			update_post_meta(
				$post_id,
				'program-contact-email',
				sanitize_textarea_field(wp_unslash($_POST['program-contact-email']))
			);
		}

		if (array_key_exists('program-download-file-id', $_POST)) {
			update_post_meta(
				$post_id,
				'program-download-file-id',
				intval(sanitize_text_field(wp_unslash($_POST['program-download-file-id'])))
			);
		}
	}

	/**
	 * Taps into the `admin_enqueue_scripts` WP action hook to load custom scripts on admin dashboard
	 *
	 * @return void
	 */
	public function admin_enqueue_scripts() {
		$this->admin_enqueue_program_scripts();
		$this->admin_enqueue_program_type_scripts();
	}

	/**
	 * Handles rendering scripts for the backend of a single Program post.
	 *
	 * @return void
	 */
	public function admin_enqueue_program_scripts() {
		if (!is_admin()) {
			return;
		}

		$current_screen = get_current_screen();

		if (self::POST_SLUG !== $current_screen->post_type) {
			return;
		}

		wp_enqueue_media();
		wp_enqueue_script('program', plugin_dir_url(__DIR__) . 'admin/program.js', ['jquery'], '1.0.0', true);
	}

	/**
	 * Handles rendering scripts for the backend of a single Program Type (taxonomy) term.
	 *
	 * @return void
	 */
	public function admin_enqueue_program_type_scripts() {
		if (!is_admin()) {
			return;
		}

		$current_screen = get_current_screen();

		if (self::POST_SLUG !== $current_screen->post_type) {
			return;
		}

		if (self::PROGRAM_TYPE_TAXONOMY_SLUG !== $current_screen->taxonomy) {
			return;
		}

		wp_enqueue_media();
		wp_enqueue_script('program-type', plugin_dir_url(__DIR__) . 'admin/program-type.js', ['jquery'], '1.0.0', true);
	}

	/**
	 * Taps into to the `program-type_edit_form_fields` WP action hook that fires on the edit screen for a taxonomy term
	 *
	 * @param WP_Term $tag      The current taxonomy term.
	 * @param string  $taxonomy The current taxonomy.
	 *
	 * @return void
	 */
	public function program_type_edit_form_fields($tag, $taxonomy) {
		$icon = $this->get_program_type_icon($tag->term_id);

		echo '<tr class="form-field term-icon-wrap">';
		echo '<th scope="row">' . esc_html(__('Icon', 'nutrition-navigator')) . '</th>';
		echo '<td>';

		echo '<div class="custom-img-container">';

		if (!empty($icon)) {
			echo '<img src="' . esc_url($icon) . '" style="max-width:100%;"/>';
		}

		echo '</div>';

		echo '<p class="hide-if-no-js">';
		echo '<button type="button" class="button upload-custom-img ' .
			(!empty($icon) ? 'hidden' : '') .
			'">' .
			esc_html(__('Add Icon', 'nutrition-navigator')) .
			'</button>';
		echo '<button type="button" class="button delete-custom-img ' .
			(empty($icon) ? 'hidden' : '') .
			'">' .
			esc_html(__('Remove Icon', 'nutrition-navigator')) .
			'</button>';
		echo '</p>';

		wp_nonce_field(plugin_basename(__FILE__), 'program_type_nonce');
		echo '<input class="custom-img-id" name="icon" type="hidden" value="' . esc_attr($icon) . '" />';

		echo '</td>';
		echo '</tr>';
	}

	/**
	 * Taps into the `edited_{$taxonomy}` WP filter hook to save custom meta for Program Type taxonomy.
	 *
	 * @param int   $term_id Term ID.
	 * @param int   $tt_id   Term taxonomy ID.
	 * @param array $args    Arguments passed to wp_update_term().
	 *
	 * @return void
	 * @see wp_update_term()
	 */
	public function edited_program_type($term_id, $tt_id, $args) {
		// Avoid `Quick Edit` removing Icon image
		if (defined('DOING_AJAX') && DOING_AJAX) {
			return;
		}

		if (
			isset($_POST['program_type_nonce']) &&
			!wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['program_type_nonce'])), plugin_basename(__FILE__))
		) {
			return;
		}

		$icon = isset($_POST['icon']) ? sanitize_text_field(wp_unslash($_POST['icon'])) : '';

		update_term_meta($term_id, 'icon', $icon);
	}

	/**
	 * Get all Organizations posts
	 *
	 * @return array
	 */
	public function get_current_organizations() {
		// Get ALL published Organization posts
		$organizations = get_posts([
			'post_type' => Nutrition_Navigator_Organizations::POST_SLUG,
			'posts_per_page' => -1,
			'post_status' => 'publish'
		]);

		if (empty($organizations)) {
			return [];
		}

		$organizations_array = array_reduce(
			$organizations,
			/**
			 * Callback for transforming array of objects to [post ID => post name] array
			 *
			 * @param array   $acc
			 * @param WP_Post $current
			 *
			 * @return array
			 */
			function ($acc, $current) {
				$acc[$current->ID] = $current->post_title;

				return $acc;
			},
			[]
		);

		return $organizations_array;
	}

	/**
	 * A getter for the Program's associated 'Organization'
	 *
	 * @param WP_Post $post Post object.
	 *
	 * @return string
	 */
	public function get_program_organization($post) {
		$organization = get_post_meta($post->ID, 'program-organization', true);

		if (empty($organization)) {
			$organization = '';
		}

		return $organization;
	}

	/**
	 * A getter for a Program's description
	 *
	 * @param WP_Post $post Post object.
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
	 * @param WP_Post $post Post object.
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
	 * @param WP_Post $post Post object.
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
	 * @param WP_Post $post Post object.
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
	 * @param WP_Post $post Post object.
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
	 * A getter for a Program's location zip code
	 *
	 * @param WP_Post $post Post object.
	 *
	 * @return integer|string
	 */
	public function get_program_location_zip_code($post) {
		$zip_code = get_post_meta($post->ID, 'program-location-zip-code', true);

		if (empty($zip_code)) {
			return '';
		}

		return intval($zip_code);
	}

	/**
	 * A getter for a Program's location dates/times offered
	 *
	 * @param WP_Post $post Post object.
	 *
	 * @return string
	 */
	public function get_program_dates_times_offered($post) {
		$dates_times_offered = get_post_meta($post->ID, 'program-location-dates-times-offered', true);

		if (empty($dates_times_offered)) {
			$dates_times_offered = '';
		}

		return $dates_times_offered;
	}

	/**
	 * A getter for a Program's contact phone number
	 *
	 * @param WP_Post $post Post object.
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
	 * @param WP_Post $post Post object.
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

	/**
	 * A getter for a Program Type's icon image URL string
	 *
	 * @param int $term_id ID of taxonomy term.
	 *
	 * @return string
	 */
	public function get_program_type_icon($term_id) {
		$icon = get_term_meta($term_id, 'icon', true);

		if (empty($icon)) {
			$icon = '';
		}

		return $icon;
	}
}

new Nutrition_Navigator_Programs();
