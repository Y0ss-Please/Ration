<?php

$home = (isset($_SERVER['HTTPS_HOST']) ? $_SERVER['HTTPS_HOST'] : $_SERVER['HTTP_HOST']).$_SERVER['SCRIPT_NAME'];
$page = isset($_GET['p']) ? $_GET['p'] : 'home';

?>

<!DOCTYPE html>

    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />

        <title>Ration Repair</title>

        <meta name="description" content="Building websites and taking the headaches out of technology and online presence. Basic landing pages to advanced web applications. Wordpress or fully custom, we'll make it happen.'" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="theme-color" content="#244e4d" />
        <meta name="msapplication-navbutton-color" content="#244e4d" />

        <link rel="stylesheet" href="normalize.css" />
        <link rel="stylesheet" href="styles.css" />

        <!-- Global site tag (gtag.js) - Google Analytics -->

    </head>

    <body>

        <!-- Hamburger Menu Button -->
        <div id="hamburger-menu"> <!-- ABSOLUTE POSITION -->
            <img src="res/menu.png" />
        </div>

        <!-- Navigation Bar -->
        <div id="navbar">

            <div id="logo">
                <img src="res/logo.svg" />
            </div>

            <div id="nav-item-container">
                <!-- Removed and repopulated by script.js -->
                <div class="nav-item<?= ($page === 'home') ? ' active' : '' ?>"><a href="<?= '//'.$home ?>">HOME</a></div>
                <div class="nav-item<?= ($page === 'services') ? ' active' : '' ?>"><a href="<?= '//'.$home.'?p=portfolio' ?>">SERVICES</a></div>
                <div class="nav-item<?= ($page === 'about') ? ' active' : '' ?>"><a href="<?= '//'.$home.'?p=about' ?>">ABOUT</a></div>
                <div class="nav-item<?= ($page === 'contact') ? ' active' : '' ?>"><a href="<?= '//'.$home.'?p=contact' ?>">CONTACT</a></div>
            </div>
            
        </div>

        <div id="main">

            <div data-page="home" class="page-container bg1<?= ($page === 'home') ? ' active' : '' ?>">
                <div class="page">
                    <div data-page="home" class="intersection-trigger"></div>

                    <div class="hero">
                        <div class="title-container">
                            <img class="title" src="res/ration.svg" />
                        </div>
                        <div class="content">
                            Mobile computer, phone and electronics repair. Servicing the Cranbrook and Kimberley area.
                        </div>
                    </div>
    
                    <div id="get-started">BOOK YOUR REPAIR</div>
    
                </div>
            </div>

            <div data-page="services" class="page-container padding-1 <?= ($page === 'services') ? ' active' : '' ?>">
                <div class="page">

                    <div class="hero margin-1-0">
                        <div class="title bg-fir text-center">Our Services</div>
                    </div>
    
                    <div class="service-icon-container bg-s1">
                        <img class="service-icon" src="res/car.svg" />
                    </div>
                    <div class="service-box">
                        <div class="service">
                            <div class="service-title">MOBILE</div>
                            <div class="service-content">We come to you! You can set up an appointment by text, email or phone call and we'll arrive at a time that's convenient for you. Smaller jobs can be done on site. While more time consuming tasks will be taken back to our repair centre and returned to you fresh and ready to go!</div>
                        </div>
                    </div>

                    <div data-page="services" class="intersection-trigger"></div>
    
                    <div class="service-icon-container bg-s2">
                        <img class="service-icon" src="res/comp.svg" />
                    </div>
                    <div class="service-box">
                        <div class="service">
                            <div class="service-title">COMPUTER REPAIR</div>
                            <div class="service-content">PC won't boot up? Laptop had a quick meeting with the floor? No worries! We can repair or replace parts of your desktop or laptop computer and have it running like new again.</div>
                        </div>
    
                        <div class="service">
                            <div class="service-title">VIRUS REMOVAL</div>
                            <div class="service-content">Malicious software comes in many flavours. Ransomware, browser hijacking, spyware. The list goes on. No matter what unwanted software is plaguing your computer we can eliminate it and get your computer back to being <b>your</b> computer.</div>
                        </div>
    
                        <div class="service">
                            <div class="service-title">PC REFRESH</div>
                            <div class="service-content">Things feeling a little... slow? Over time your computer can get bogged down with extra software and unused files. We can get your computer cleaned up and back to its old self.</div>
                        </div>
                    </div>
    
                    <div class="service-icon-container bg-s3">
                        <img class="service-icon" src="res/phone.svg" />
                    </div>
                    <div class="service-box">
                        <div class="service">
                            <div class="service-title">PHONE REPAIR</div>
                            <div class="service-content">Smashed screens, broken charge ports and swollen batteries. All things that can make your phone unusable. Also things we can fix!</div>
                        </div>
                    </div>
    
                    <div class="service-icon-container bg-s4">
                        <img class="service-icon" src="res/hdd.svg" />
                    </div>
                    <div class="service-box">
                        <div class="service">
                            <div class="service-title">FILE RECOVERY</div>
                            <div class="service-content">Precious files or photos trapped on a computer that no longer runs? We can save that information!</div>
                        </div>
    
                        <div class="service">
                            <div class="service-title">DATA RECOVERY</div>
                            <div class="service-content">Deleted doesn't always mean gone. If there's files missing that you need back, talk to us.</div>
                        </div>
                    </div>

                    <div data-page="services" class="intersection-trigger"></div>
    
                    <div class="service-icon-container bg-s5">
                        <img class="service-icon" src="res/cog.svg" />
                    </div>
                    <div class="service-box">
                        <div class="service">
                            <div class="service-title">TECH ASSISTANCE</div>
                            <div class="service-content">The catch-all. If it's technology related and it's not working like it should, we're here to help.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div data-page="contact" class="page-container bg2<?= ($page === 'contact') ? ' active' : '' ?>">
                <div class="page">

                    <div class="hero">
                        <div class="title-container">
                            <div class="title">CONTACT</div>
                        </div>
                        <?php
                        if (empty($_GET['message'])) {
                        ?>
                        <div class="content">
                            <p>Text / Call : 250-421-7286</p>
                        </div>

                        <div data-page="contact" class="intersection-trigger"></div>

    
                        <div class="content">
                            <p>Or use the form below to send a message, we'll get back to you soon!</p>
                        </div>
                    </div>
    
                    <form id="contact" name="contact" method="POST" onsubmit="form_submit(event)" action="contact.php">
                        <div class="flex-center">
                            <label for="subject">Subject:</label>
                        </div>
                        <input name="subject" type="text" required>
                        <div class="flex-center">
                            <label for="email">Email:</label>
                        </div>
                        <input name="email" type="email" required>
                        <label for="message" class="col-span">Message:</label>
                        <textarea id="contact-message" name="message" class="col-span" required></textarea>
                        <input type="submit" class="col-span" value="send message">
                    </form>
    
                    <div id="keyboard-spacer"></div>
    
                        <?php
                        } else if (!empty($_GET['message']) && $_GET['message'] == 'sent') {
                        ?>
                        <div id="console-contact" class="tagline">// MESSAGE SENT!</div>
                        <div class="content">We'll get back to you soon!</div>
                    </div>
                        <?php
                        } else {
                        ?>
                        <div id="console-contact" class="tagline">// ERROR</div>
                        <div class="content">Your message was not sent, sorry! Please try again, or send and email to <a href="mailto::casey@tired.dog">casey@tired.dog</a></div>
                    </div>
                        <?php
                        }
                        ?>
                </div>
            </div>
        </div>

        <div id="footer">
            
        </div>

        <script>
            // Server sets this to equal $_GET['p']
            // Which was set by .htaccess mod_rewrite
            var paramPage = <?php echo(isset($page) ? '\''.$page.'\'' : 'undefined') ?>

        </script>
        <script src="script.js"></script>
    </body>
</html>