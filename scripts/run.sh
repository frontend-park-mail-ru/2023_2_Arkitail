set_default() {
	if [[ -z ${!1} ]]; then
		export $1=$2
	fi
}

set_default GOTO_BACKEND_SOURCE_DIR ~/repos/2023_2_Arkitail_back
set_default GOTO_BACKEND_SECRET alkjhaldjf

docker run -d \
	--network=host \
	--name backend \
	--mount type=bind,src=${GOTO_BACKEND_SOURCE_DIR},target=/goto \
	-w /goto \
	backend-park-company \
	bash -c "go run cmd/goToProject/main.go -secret ${GOTO_BACKEND_SECRET}"

set_default GOTO_HOST_IP 127.0.0.1
set_default GOTO_NGINX_CONFIG_DIR ~/repos/2023_2_Arkitail/docker/nginx
set_default GOTO_SOURCE_DIR ~/repos/2023_2_Arkitail/source

docker run -d \
    --network=host \
	--name frontend \
	--mount type=bind,src=${GOTO_NGINX_CONFIG_DIR},target=/etc/nginx \
	--mount type=bind,src=${GOTO_SOURCE_DIR},target=/goto \
	frontend-park-company