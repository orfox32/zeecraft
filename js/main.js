let t;

        $(document).ready(() => {
            t = $(".ip").html();
        });

        $(document).on("click", ".ip", () => {
            let copy = document.createElement("textarea");
            copy.style.position = "absolute";
            copy.style.left = "-99999px";
            copy.style.top = "0";
            copy.setAttribute("id", "ta");
            document.body.appendChild(copy);
            copy.textContent = t;
            copy.select();
            document.execCommand("copy");
            $(".ip").html("<span class='extrapad'>IP copied!</span>");
            setTimeout(() => {
                $(".ip").html(t);
                var copy = document.getElementById("ta");
                copy.parentNode.removeChild(copy);
            }, 800);
        });

        $(document).ready(() => {
            let ip = $(".sip").attr("data-ip");
            let port = $(".sip").attr("data-port");
            if (port == "" || port == null) port = "25565";
            if (ip == "" || ip == null) return console.error("Error fetching player count - is the IP set correctly in the HTML?");
            
            // Use MinecraftAPI to get server status
            MinecraftAPI.getServerStatus(ip, {
                port: port // optional, only if you need a custom port
            }, function (err, status) {
                if (err) {
                    // Handle error loading status
                    return console.error('Error loading status');
                }

                // Display server status
                $(".server-online").html(status.online ? 'up' : 'down');
            });

            // Updates every minute (not worth changing due to API cache)
            setInterval(() => {
                // Use MinecraftAPI to get server status
                MinecraftAPI.getServerStatus(ip, {
                    port: port // optional, only if you need a custom port
                }, function (err, status) {
                    if (err) {
                        // Handle error loading status
                        return console.error('Error loading status');
                    }

                    // Display server status
                    $(".server-online").html(status.online ? 'up' : 'down');
                });
            }, 60000);
        });

const updatePlayercount = (ip, port) => {
    // Use MinecraftAPI to get server status
    MinecraftAPI.getServerStatus(ip, {
        port: port // optional, only if you need a custom port
    }, function (err, status) {
        if (err) {
            // Handle error loading status
            return console.error('Error loading status');
        }

        // Display server status
        $(".sip").html(status.online ? 'Server is online' : 'Server is offline');
    });
};

/*const updatePlayercount = (ip, port) => {
    $.get(`https://api.bybilly.uk/api/players/${ip}/${port}`, (result) => {
        if (result.hasOwnProperty('online')) {
            $(".sip").html(result.online);
        } else {
            $(".minecraftcount").html("Server isn't online!");
        }
    });
};*/
