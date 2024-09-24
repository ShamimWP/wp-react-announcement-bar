<?php
/**
 * Show output to Frontend Page.
 *
 * @return void
 */
function wp_react_announcement_bar_front_page() {
	$options = get_option( 'shamim_react_announcement_bar' );

	if ( ! $options['display'] ) {
		return;
	}

	$front_style = WP_Style_Engine::compile_css(
		array(
			'background' => 'var(--wp--preset--color--vivid-purple, #9b51e0)',
			'color'      => 'var(--wp--preset--color--white, #ffffff)',
			'padding'    => 'var(--wp--preset--spacing--20, 1.5rem)',
			'text-align' => 'center',
			'font-size'  => $options['size'],
		),
		''
	);

	printf(
		'<div style="%s">%s</div>',
		esc_attr( $front_style ),
		esc_html( $options['message'] )
	);
}

add_action( 'wp_body_open', 'wp_react_announcement_bar_front_page' );




if ( ! function_exists( 'wp_body_open' ) ) {

	/**
	 * Fire the wp_body_open action.
	 * Adds backward compatibility for WordPress versions < 5.2
	 *
	 * @since 1.8.7
	 */
	function wp_body_open() { // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedFunctionFound
		do_action( 'wp_body_open' ); // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
	}
}
