<?php
/** */
/*
Plugin Name: scoff
Plugin URI: https://ätstörning.se/
Description: Shortcode för att integrera ett SCOFF-test i en WP-sida
Version: 0.0.1
Requires at least: 6.1
Requires PHP: 8.0
Author: Staffan Bergh, MEB, KI
Author URI: https://staff.ki.se/people/staffan-bergh
License: GPLv2 or later
Text Domain: scoff
*/

add_shortcode( 'scoff', 'scoff_func' );
add_action( 'wp_enqueue_scripts', 'scoff_assets' );

function scoff_assets() {
    wp_register_style( 'scoff-button-style', plugins_url( '/styles/style.css' , __FILE__ ) );
    wp_register_script( 'scoff-button-script', plugins_url( '/scripts/scoff.js' , __FILE__ ) );

    wp_enqueue_style( 'scoff-button-style' );
    wp_enqueue_script( 'scoff-button-script' );
}

function add_onload() {
    ?>
    <script type="text/javascript">

    document.getElementsByTagName('body')[0].onload = init_scoff_test; // body.onload

    </script>
    <?php
}

add_action( 'wp_footer', 'add_onload' );

function scoff_func() {
    ob_start();?>
    
    <!-- html to emit från shortcode -->
    <div id="testwrapper">
        <button id="testopenbutton">Starta testet</button>
        <div id="test" class="scoff">
            <div id="question"></div>
            <div id="summary" hidden></div>
            <button id="testresetbutton">Gör om testet</button>
            <button id="testclosebutton">Stäng</button>        
        </div>
    </div>
    <!-- end shortcode -->    
    <?php
    return ob_get_clean();
}

?>