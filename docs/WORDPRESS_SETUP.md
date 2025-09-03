# WordPress + Elementor Integration Guide

## WordPress Backend Setup

### 1. WordPress Installation
```bash
# Install WordPress locally or on hosting
# Recommended: Local by Flywheel or XAMPP for development
```

### 2. Required Plugins
- **Elementor Pro** - Page builder
- **WP REST API** - API endpoints (built-in WordPress 4.7+)
- **JWT Authentication** - Secure API access
- **Custom Post Type UI** - Custom content types
- **Advanced Custom Fields (ACF)** - Custom fields
- **MailChimp for WordPress** - Newsletter integration
- **WP CORS** - Cross-origin requests

### 3. WordPress Configuration

#### wp-config.php additions:
```php
// Enable REST API
define('WP_REST_API', true);

// CORS headers
define('WP_CORS_ALLOW_ORIGIN', 'http://localhost:5173'); // Your React dev server
define('WP_CORS_ALLOW_CREDENTIALS', true);

// JWT Secret Key
define('JWT_AUTH_SECRET_KEY', 'your-secret-key-here');
```

#### functions.php additions:
```php
// Enable CORS for REST API
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: http://localhost:5173');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
        return $value;
    });
});

// Custom REST API endpoint for newsletter
add_action('rest_api_init', function() {
    register_rest_route('timesoffashion/v1', '/newsletter', array(
        'methods' => 'POST',
        'callback' => 'handle_newsletter_subscription',
        'permission_callback' => '__return_true'
    ));
});

function handle_newsletter_subscription($request) {
    $email = sanitize_email($request->get_param('email'));
    $name = sanitize_text_field($request->get_param('name'));
    
    if (!is_email($email)) {
        return new WP_Error('invalid_email', 'Invalid email address', array('status' => 400));
    }
    
    // Save to database
    global $wpdb;
    $table_name = $wpdb->prefix . 'newsletter_subscribers';
    
    $result = $wpdb->insert(
        $table_name,
        array(
            'email' => $email,
            'name' => $name,
            'subscribed_at' => current_time('mysql'),
            'status' => 'active'
        )
    );
    
    if ($result === false) {
        return new WP_Error('db_error', 'Failed to save subscription', array('status' => 500));
    }
    
    // Integrate with MailChimp/ConvertKit here
    // send_to_mailchimp($email, $name);
    
    return array('message' => 'Successfully subscribed!', 'status' => 'success');
}

// Create newsletter table on activation
register_activation_hook(__FILE__, 'create_newsletter_table');
function create_newsletter_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'newsletter_subscribers';
    
    $charset_collate = $wpdb->get_charset_collate();
    
    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        email varchar(100) NOT NULL,
        name varchar(100),
        subscribed_at datetime DEFAULT CURRENT_TIMESTAMP,
        status varchar(20) DEFAULT 'active',
        PRIMARY KEY (id),
        UNIQUE KEY email (email)
    ) $charset_collate;";
    
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}
```

## Elementor Integration

### 1. Content Creation Workflow
- Use Elementor to create **blog post templates**
- Design **newsletter templates**
- Create **landing pages** for campaigns
- Build **admin dashboard** layouts

### 2. Custom Elementor Widgets
```php
// Custom widget for newsletter signup
class TimesOfFashion_Newsletter_Widget extends \Elementor\Widget_Base {
    public function get_name() {
        return 'tof_newsletter';
    }
    
    public function get_title() {
        return 'TOF Newsletter';
    }
    
    public function get_icon() {
        return 'fa fa-envelope';
    }
    
    protected function render() {
        echo '<div id="tof-newsletter-widget"></div>';
        echo '<script>
            // This will be handled by your React component
            window.TOF_Newsletter_Config = {
                apiUrl: "' . rest_url('timesoffashion/v1/newsletter') . '",
                nonce: "' . wp_create_nonce('wp_rest') . '"
            };
        </script>';
    }
}
```

## Email Service Integration

### MailChimp Integration
```php
// Add to functions.php
function send_to_mailchimp($email, $name) {
    $api_key = 'your-mailchimp-api-key';
    $list_id = 'your-list-id';
    $datacenter = substr($api_key, strpos($api_key, '-') + 1);
    
    $url = "https://{$datacenter}.api.mailchimp.com/3.0/lists/{$list_id}/members";
    
    $data = array(
        'email_address' => $email,
        'status' => 'subscribed',
        'merge_fields' => array(
            'FNAME' => $name
        )
    );
    
    $args = array(
        'method' => 'POST',
        'headers' => array(
            'Authorization' => 'Basic ' . base64_encode('user:' . $api_key),
            'Content-Type' => 'application/json'
        ),
        'body' => json_encode($data)
    );
    
    wp_remote_post($url, $args);
}
```

### ConvertKit Integration
```php
function send_to_convertkit($email, $name) {
    $api_key = 'your-convertkit-api-key';
    $form_id = 'your-form-id';
    
    $url = "https://api.convertkit.com/v3/forms/{$form_id}/subscribe";
    
    $data = array(
        'api_key' => $api_key,
        'email' => $email,
        'first_name' => $name
    );
    
    wp_remote_post($url, array('body' => $data));
}
```

## Content Management

### Custom Post Types for Fashion Content
```php
// Register custom post types
add_action('init', 'create_fashion_post_types');
function create_fashion_post_types() {
    // Fashion Articles
    register_post_type('fashion_article', array(
        'labels' => array(
            'name' => 'Fashion Articles',
            'singular_name' => 'Fashion Article'
        ),
        'public' => true,
        'show_in_rest' => true, // Enable REST API
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'taxonomies' => array('fashion_category')
    ));
    
    // Newsletter Templates
    register_post_type('newsletter_template', array(
        'labels' => array(
            'name' => 'Newsletter Templates',
            'singular_name' => 'Newsletter Template'
        ),
        'public' => false,
        'show_ui' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor')
    ));
}

// Custom taxonomy for fashion categories
add_action('init', 'create_fashion_taxonomies');
function create_fashion_taxonomies() {
    register_taxonomy('fashion_category', 'fashion_article', array(
        'hierarchical' => true,
        'labels' => array(
            'name' => 'Fashion Categories',
            'singular_name' => 'Fashion Category'
        ),
        'show_in_rest' => true,
        'public' => true
    ));
}
```

## Weekly Newsletter Automation

### Cron Job Setup
```php
// Schedule weekly newsletter
add_action('wp', 'schedule_weekly_newsletter');
function schedule_weekly_newsletter() {
    if (!wp_next_scheduled('send_weekly_newsletter')) {
        wp_schedule_event(time(), 'weekly', 'send_weekly_newsletter');
    }
}

add_action('send_weekly_newsletter', 'send_weekly_newsletter_callback');
function send_weekly_newsletter_callback() {
    // Get latest articles
    $articles = get_posts(array(
        'post_type' => 'fashion_article',
        'posts_per_page' => 5,
        'date_query' => array(
            array(
                'after' => '1 week ago'
            )
        )
    ));
    
    // Get newsletter template
    $template = get_posts(array(
        'post_type' => 'newsletter_template',
        'name' => 'weekly-newsletter',
        'posts_per_page' => 1
    ));
    
    if ($template && $articles) {
        $newsletter_content = compile_newsletter_content($template[0], $articles);
        send_newsletter_to_subscribers($newsletter_content);
    }
}

function compile_newsletter_content($template, $articles) {
    $content = $template->post_content;
    
    // Replace placeholders with actual content
    $articles_html = '';
    foreach ($articles as $article) {
        $articles_html .= '<div class="article">';
        $articles_html .= '<h3>' . $article->post_title . '</h3>';
        $articles_html .= '<p>' . $article->post_excerpt . '</p>';
        $articles_html .= '<a href="' . get_permalink($article->ID) . '">Read More</a>';
        $articles_html .= '</div>';
    }
    
    $content = str_replace('{{WEEKLY_ARTICLES}}', $articles_html, $content);
    $content = str_replace('{{DATE}}', date('F j, Y'), $content);
    
    return $content;
}

function send_newsletter_to_subscribers($content) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'newsletter_subscribers';
    
    $subscribers = $wpdb->get_results(
        "SELECT email, name FROM $table_name WHERE status = 'active'"
    );
    
    foreach ($subscribers as $subscriber) {
        $personalized_content = str_replace('{{NAME}}', $subscriber->name, $content);
        
        wp_mail(
            $subscriber->email,
            'Times of Fashion - Weekly Newsletter',
            $personalized_content,
            array('Content-Type: text/html; charset=UTF-8')
        );
    }
}
```

## Security Considerations

### API Security
```php
// Add nonce verification for sensitive endpoints
add_action('rest_api_init', function() {
    register_rest_route('timesoffashion/v1', '/newsletter', array(
        'methods' => 'POST',
        'callback' => 'handle_newsletter_subscription',
        'permission_callback' => function($request) {
            return wp_verify_nonce($request->get_header('X-WP-Nonce'), 'wp_rest');
        }
    ));
});

// Rate limiting
function check_rate_limit($ip) {
    $transient_key = 'newsletter_rate_limit_' . md5($ip);
    $requests = get_transient($transient_key);
    
    if ($requests >= 5) { // Max 5 requests per hour
        return false;
    }
    
    set_transient($transient_key, $requests + 1, HOUR_IN_SECONDS);
    return true;
}
```

## Development Workflow

1. **Local Development**: Use Local by Flywheel or XAMPP
2. **Content Creation**: Use Elementor for templates and layouts
3. **API Testing**: Test endpoints with Postman
4. **Frontend Integration**: Connect React components to WordPress API
5. **Email Testing**: Use MailHog or similar for local email testing
6. **Deployment**: Deploy WordPress backend separately from React frontend

## Production Considerations

- Use CDN for WordPress media files
- Implement caching (WP Rocket, W3 Total Cache)
- Set up proper backup system
- Monitor API performance
- Implement proper logging for newsletter sends
- Set up email deliverability monitoring
