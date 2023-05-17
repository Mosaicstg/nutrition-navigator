<?php

class NutritionNavigatorShortcodes {
    /**
     * @var bool
     */
    private $shortcode_rendered = false;

    public function __construct() {
        // WordPress action hooks
        add_action('init', [$this, 'init']);
        add_action('wp_enqueue_scripts', [$this, 'wp_enqueue_scripts']);
        add_action('wp_footer', [$this, 'wp_footer']);
    }

    public function init() {
        $this->add_shortcodes();
    }

    public function wp_enqueue_scripts() {
        wp_register_script(
            'nutrition-navigator',
            plugin_dir_url(__DIR__) . 'dist/assets/index-09bcdb25.js',
            null,
            true
        );
    }

    public function add_shortcodes() {
        add_shortcode('nutrition_navigator', [$this, 'nutrition_navigator_shortcode']);
    }

    public function nutrition_navigator_shortcode() {
        $this->shortcode_rendered = true;

//        return '<div id="nutrition-navigator"></div>';
    }

    public function wp_footer() {
        if (!$this->shortcode_rendered) {
            return;
        }

        wp_print_scripts('nutrition-navigator');
    }
}

new NutritionNavigatorShortcodes();
