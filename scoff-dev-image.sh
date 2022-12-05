#!/bin/sh
ctr=$(buildah from docker.io/wordpress:6.1.1-php8.1-apache)
mnt=$(buildah mount $ctr)
# where wordpress lurks before installation!
mkdir $mnt/usr/src/wordpress/wp-content/plugins/scoff
chown www-data.www-data $mnt/usr/src/wordpress/wp-content/plugins/scoff
buildah commit $ctr scoff-plugin-dev
