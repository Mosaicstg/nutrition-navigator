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

	public function __construct() {
		// WordPress action hooks.
		add_action( 'init', array( $this, 'init' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ) );
		add_action( 'wp_footer', array( $this, 'wp_footer' ) );
	}

	public function init() {
		$this->add_shortcodes();
	}

	public function wp_enqueue_scripts() {
		wp_register_script(
			'nutrition-navigator',
			plugin_dir_url( __DIR__ ) . 'dist/nutrition-navigator/index.js',
			array(),
			null,
			true
		);

		// Load React app build styles.
		wp_register_style(
			'nutrition-navigator',
			plugin_dir_url( __DIR__ ) . 'dist/nutrition-navigator/index.css',
			array(),
			null
		);
	}

	public function add_shortcodes() {
		add_shortcode( 'nutrition_navigator', array( $this, 'nutrition_navigator_shortcode' ) );
	}

	public function nutrition_navigator_shortcode() {
		$this->shortcode_rendered = true;

		// Only loads styles when shortcode is rendered.
		wp_enqueue_style( 'nutrition-navigator' );

		return '<div id="nutrition-navigator"></div>';
	}

	public function wp_footer() {
		if ( ! $this->shortcode_rendered ) {
			return;
		}

		wp_print_scripts( 'nutrition-navigator' );
	}
}

new NutritionNavigatorShortcodes();
