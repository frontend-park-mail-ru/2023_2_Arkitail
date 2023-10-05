set_default() {
	if [[ -n $1 ]]; then
		export $1=$2
	fi
}

set_default GOTO_HOST_IP 127.0.0.1
set_default GOTO_NGINX_CONFIG_DIR ~/dev/js/2023_2_Arkitail/docker/nginx
set_default GOTO_SOURCE_DIR ~/dev/js/2023_2_Arkitail/source

docker run -dp ${GOTO_HOST_IP}:80:80 \
	--mount type=bind,src=${GOTO_NGINX_CONFIG_DIR},target=/etc/nginx \
	--mount type=bind,src=${GOTO_SOURCE_DIR},target=/goto \
	frontend-park-company
