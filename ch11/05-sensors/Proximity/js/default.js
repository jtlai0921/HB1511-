(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    WinJS.strictProcessing();

    var proximityDevice, requestingPeer;


    app.onactivated = function (eventObject) {
      if (eventObject.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.launch) {

        document.getElementById("advertiseForPeers").addEventListener("click", advertiseForPeers);
        document.getElementById("accept").addEventListener("click", acceptConnection);
        document.getElementById("findPeers").addEventListener("click", findPeers);
        document.getElementById("stopFindingPeers").addEventListener("click", stopFindingPeers);

        document.getElementById("displayName").value = Windows.Networking.Proximity.PeerFinder.displayName;
        Windows.Networking.Proximity.PeerFinder.addEventListener("connectionrequested", connectionRequested);

        WinJS.UI.processAll();
      }
    };

    function advertiseForPeers() {
      Windows.Networking.Proximity.PeerFinder.displayName = document.getElementById("displayName").Text;
      Windows.Networking.Proximity.PeerFinder.start();

      if (Windows.Networking.Proximity.PeerFinder.supportedDiscoveryTypes &
          Windows.Networking.Proximity.PeerDiscoveryTypes.triggered) {

        Windows.Networking.Proximity.PeerFinder.addEventListener("triggeredconnectionstatechanged", triggeredConnectionStateChanged);

        document.getElementById("message").innerHTML += "You can tap to connect a peer device that is " +
            "also advertising for a connection.<br />";
      } else {
        document.getElementById("message").innerHTML += "Tap to connect is not supported.<br />";
      }

      if (!(Windows.Networking.Proximity.PeerFinder.SupportedDiscoveryTypes &
            Windows.Networking.Proximity.PeerDiscoveryTypes.Browse)) {
        document.getElementById("message").innerHTML += "Peer discovery using Wifi-Direct is not supported.<br />";
      }
    }

    function triggeredConnectionStateChanged(e) {
      if (e.state === Windows.Networking.Proximity.TriggeredConnectState.peerFound) {
        docuument.getElementById("message").innerHTML +=
            "Peer found. You may now pull your devices out of proximity.<br />";
      }
      if (e.state === Windows.Networking.Proximity.TriggeredConnectState.completed) {
        document.getElementById("message").innerHTML += "Connected. You may now send a message.<br />";
        sendMessage(e.socket);
      }
    }

    function findPeers() {
      if (Windows.Networking.Proximity.PeerFinder.supportedDiscoveryTypes &
          Windows.Networking.Proximity.PeerDiscoveryTypes.browse) {

        Windows.Networking.Proximity.PeerFinder.findAllPeersAsync().done(function (peerInfoCollection) {
          if (peerInfoCollection.length > 0) {
            connectToPeer(peerInfoCollection[0]);
          }
        }, function (err) {
          document.getElementById("message").innerHTML += "Error finding peers: " + err + "<br />";
        });
      } else {
        document.getElementById("message").innerHTML += "Peer discovery using Wi-Fi Direct is not supported.<br />";
      }
    }

    function connectToPeer(peerInfo) {
      document.getElementById("message").innerHTML += ("Peer found. Connecting to " + peerInfo.displayName + "<br />");
      Windows.Networking.Proximity.PeerFinder.connectAsync(peerInfo).done(
          function (socket) {
            document.getElementById("message").innerHTML += "Connection successful. You may now send messages.<br />";
            sendMessage(socket);
          },
          function (err) {
            document.getElementById("message").innerHTML += "Connection failed: " + err + "<br />";
          });

      requestingPeer = null;
    }

    var proximitySocket;
    var dataWriter;

  // Reference socket streams for writing and reading messages.
    function sendMessage(socket) {
      document.getElementById("sendMessage").addEventListener("click", sendMessageText);

      // Get the network socket from the proximity connection.
      proximitySocket = socket;

      // Create DataWriter for writing messages to peers.
      dataWriter = new Windows.Storage.Streams.DataWriter(proximitySocket.outputStream);

      // Listen for messages from peers.
      var dataReader = new Windows.Storage.Streams.DataReader(proximitySocket.inputStream);
      startReader(proximitySocket, dataReader);
    }

  // Send a message to the socket.
    function sendMessageText() {
      var msg = document.getElementById("messageTxt").value;

      if (msg.length > 0) {
        var msgLength = dataWriter.measureString(msg);
        dataWriter.writeInt32(msgLength);
        dataWriter.writeString(msg);
        dataWriter.storeAsync().done(
            function (byteCount) {
              document.getElementById("chat").innerHTML += "Message sent: " + msg + "<br />";
            },
            function (err) {
              document.getElementById("message").innerHTML += "Send error: " + err.message + "<br />";
            });
      }
    }

    function startReader(socket, reader) {
      var initialLength = 4;
      reader.loadAsync(initialLength).done(function () {
          var msgLength = reader.readInt32();
          reader.loadAsync(msgLength).done(function () {
              var message = reader.readString(msgLength);
              document.getElementById("chat").innerHTML += "Received message: " + message + "<br />";

              // After receiving a message, listen for the next message.
              startReader(socket, reader);
            },
            function (err) {
              document.getElementById("message").innerHTML += "Error: " + err.message + "<br />";
              socket.close();
            });
        });
     }

    function stopFindingPeers() {
      Windows.Networking.Proximity.PeerFinder.stop();
      if (proximitySocket) { proximitySocket.close(); }
    }

    function connectionRequested(e) {
      document.getElementById("message").innerHTML +=
          "Connection requested by " + e.peerInformation.DisplayName + ". " +
          "Click 'Accept Connection' to connect.";
      requestingPeer = e.PeerInformation;
    }

    function acceptConnection() {
      if (requestingPeer == null) {
        document.getElementById("message").innerHTML += "No peer connection has been requested.";
        return;
      }

      connectToPeer(requestingPeer);
    }
  
    app.start();
})();
