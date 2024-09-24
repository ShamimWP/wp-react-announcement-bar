<?php
/**
 * Plugin Name:       WP React Announcement Bar
 * Description:       A Testing Plugin to practice React with WordPress Plugin Page. This plugin will add an announcement bar to website if we enable the option form setting page.
 * Requires at least: 6.6
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Shamim Mia
 * Plugin URI:       https://shamimmia.com
 * Author URI:       https://shamimmia.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wp-react-announcement-bar
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Setting Page.
 *
 * @return void
 */
function shamim_wp_react_announcement_bar() {
	add_options_page( __( 'React Announcement Bar', 'wp-react-announcement-bar' ), __( 'React Announcement Bar', 'wp-react-announcement-bar' ), 'manage_options', 'wp-react-announcement-bar', 'wp_react_announcement_bar_setting_page_html' );
}

add_action( 'admin_menu', 'shamim_wp_react_announcement_bar' );

/**
 * Settings Page HTML
 *
 * @return void
 */
function wp_react_announcement_bar_setting_page_html() {
	printf( '<div class="wrap" id="shamim-announcement-bar-settings">%s</div>', esc_html__( ' Loading...', 'wp-react-announcement-bar' ) );
}

/**
 * Enqueue setting page styles and scripts.
 *
 * @param string $admin_page The admin page ID.
 * @return void
 */
function wp_react_announcement_bar_setting_page_enqueue_style_script( $admin_page ) {
	if ( 'settings_page_wp-react-announcement-bar' !== $admin_page ) {
		return;
	}

	$asset_file = plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	if ( ! file_exists( $asset_file ) ) {
		return;
	}

	$asset = include $asset_file;

	wp_enqueue_script( 'wp-react-announcement-bar-script', plugins_url( 'build/index.js', __FILE__ ), $asset['dependencies'], $asset['version'], array( 'in_footer' => true ) );

	// Enqueue Component Style.
	wp_enqueue_style( 'wp-components' );
}

add_action( 'admin_enqueue_scripts', 'wp_react_announcement_bar_setting_page_enqueue_style_script' );

/**
 * Register Setting Option with Valid schema to Make it Rest API friendly.
 *
 * @return void
 */
function shamim_react_announcement_bar_settings() {
	$default = array(
		'message' => __( 'Hello Bangladesh', 'wp-react-announcement-bar' ),
		'display' => true,
		'size'    => 'medium',
	);
	$schema  = array(
		'type'       => 'object',
		'properties' => array(
			'message' => array(
				'type' => 'string',
			),
			'display' => array(
				'type' => 'boolean',
			),
			'size'    => array(
				'type' => 'string',
				'enum' => array(
					'small',
					'medium',
					'large',
					'x-large',
				),
			),
		),
	);

	register_setting(
		'options',
		'shamim_react_announcement_bar',
		array(
			'type'         => 'object',
			'default'      => $default,
			'show_in_rest' => array(
				'schema' => $schema,
			),
		)
	);
}

add_action( 'init', 'shamim_react_announcement_bar_settings' );

// Include frontend.php file for Frontend functionality.
require plugin_dir_path( __FILE__ ) . 'frontend.php';
