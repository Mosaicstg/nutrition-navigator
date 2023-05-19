<?php
/**
 * Nutrition Navigator: Custom shortcodes
 *
 * @package Nutrition Navigator
 */

/**
 * Create shortcodes for plugin
 */
class NutritionNavigatorShortcodes {
	/**
	 * A bool value that tracks if shortcode is rendered.
	 *
	 * @var bool
	 */
	private $shortcode_rendered = false;

	/**
	 * Class constructor
	 */
	public function __construct() {
		// WordPress action hooks.
		add_action('init', [$this, 'init']);
		add_action('wp_enqueue_scripts', [$this, 'wp_enqueue_scripts']);
		add_action('wp_footer', [$this, 'wp_footer']);
	}

	/**
	 * Taps into the `init` WP action hook
	 *
	 * @return void
	 */
	public function init() {
		$this->add_shortcodes();
	}

	/**
	 * Taps into the `wp_enqueue_scripts` WP action hook
	 *
	 * @return void
	 */
	public function wp_enqueue_scripts() {
		wp_register_script(
			'nutrition-navigator',
			plugin_dir_url(__DIR__) . 'dist/nutrition-navigator/index.js',
			[],
			1.0,
			true
		);

		// Load React app build styles.
		wp_register_style(
			'nutrition-navigator',
			plugin_dir_url(__DIR__) . 'dist/nutrition-navigator/index.css',
			[],
			1.0
		);
	}

	/**
	 * Registers shortcodes.
	 *
	 * @return void
	 */
	public function add_shortcodes() {
		add_shortcode('nutrition_navigator', [$this, 'nutrition_navigator_shortcode']);
	}

	/**
	 * Shortcode callback for rendering the React app
	 *
	 * @return string
	 */
	public function nutrition_navigator_shortcode() {
		$this->shortcode_rendered = true;

		// Only loads styles when shortcode is rendered.
		wp_enqueue_style('nutrition-navigator');

		return '<div id="nutrition-navigator"></div>';
	}

	/**
	 * Taps into the `wp_footer` WP action hook
	 *
	 * @return void
	 */
	public function wp_footer() {
		if (!$this->shortcode_rendered) {
			return;
		}

		wp_print_scripts('nutrition-navigator');
	}
}

new NutritionNavigatorShortcodes();
