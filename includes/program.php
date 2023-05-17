<?php

class FoodTrustPrograms {
    const POST_SLUG = 'programs';
    const POST_REWRITE_SLUG = 'programs';

    const PROGRAM_TYPE_TAXONOMY_SLUG = 'program-type';
    const VENUE_TAXONOMY_SLUG = 'venue';
    const AUDIENCE_TAXONOMY_SLUG = 'audience';

    public function __construct() {
        // WordPress action hooks
        add_action('init', [$this, 'init']);
    }

    public function init() {
        $this->register_taxonomy();
        $this->register_post_type();
        $this->register_post_meta_fields();
    }

    public function register_taxonomy() {
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
            'public' => true,
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
            'public' => true,
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
            'public' => true,
            'has_archive' => false,
            'taxonomies' => [self::PROGRAM_TYPE_TAXONOMY_SLUG, self::VENUE_TAXONOMY_SLUG, self::AUDIENCE_TAXONOMY_SLUG],
            'show_in_rest' => true,
            'capability_type' => 'post',
            'rewrite' => [
                'slug' => self::POST_REWRITE_SLUG,
                'with_front' => false
            ],
            'supports' => ['title', 'editor', 'revisions', 'thumbnail', 'custom-fields']
        ]);
    }

    public function register_post_meta_fields() {
    }
}

new FoodTrustPrograms();
