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
    // Function to update server status and player count
    const updateServerStatusAndPlayerCount = () => {
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

            // Display player count if the server is online
            if (status.online) {
                updatePlayerCount(status.players.now);
            } else {
                // Server is offline, display appropriate message
                $(".minecraftcount").html('Server is offline');
            }
        });
    };

    // Function to update player count
    const updatePlayerCount = (playerCount) => {
        $(".sip").html(playerCount);
    };

    // Initial call to update server status and player count
    updateServerStatusAndPlayerCount();

    // Updates every minute (not worth changing due to API cache)
    setInterval(() => {
        // Call the function to update server status and player count
        updateServerStatusAndPlayerCount();
    }, 60000);
});

/*const updatePlayercount = (ip, port) => {
    $.get(`https://api.bybilly.uk/api/players/${ip}/${port}`, (result) => {
        if (result.hasOwnProperty('online')) {
            $(".sip").html(result.online);
        } else {
            $(".minecraftcount").html("Server isn't online!");
        }
    });
};*/
