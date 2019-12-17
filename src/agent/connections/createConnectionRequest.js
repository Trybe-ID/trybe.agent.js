const uuid = require('uuid')



async function createConnectionRequest() {
    const connection_id = uuid()
    
    // Invitation
    const type = "  "
    const invitation_id = uuid()
    const recipientKeys = []
    const serviceEndpoint = `http://localhost:3002`
    const label = 'Convergence.tech Inc.'

    const invitation = {
        "@type": type,
        "@id": invitation_id,
        recipientKeys,
        serviceEndpoint,
        label
    }

    const invitationJSON = JSON.stringify({
        "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/connections/1.0/invitation", 
        "@id": "91ad9b65-b366-4dd2-96f9-2a92670a838b", 
        "recipientKeys": ["B4u3YTNsdXa5pUkhpKWbXatxTh8APrJmDnnW1vXJDww1"], 
        "serviceEndpoint": "http://172.17.0.1:8020", 
        "label": "Convergence.tech Inc.",
        "imageUrl": "https://res.cloudinary.com/dadlqfryt/image/upload/v1572813811/convergence-logos/convergence-icon_zk59ej.png"
    })
    const cAscii = Buffer.from(invitationJSON, "ascii");
    const cBytes = cAscii.toString('base64')
    const url = `http://172.17.0.1:8030?c_i=${cBytes.toString()}`
    console.log('actual')
    console.log(url)

    const invitationJSON = JSON.stringify({"@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/connections/1.0/invitation", "@id": "91ad9b65-b366-4dd2-96f9-2a92670a838b", "recipientKeys": ["B4u3YTNsdXa5pUkhpKWbXatxTh8APrJmDnnW1vXJDww1"], "serviceEndpoint": "http://172.17.0.1:8020", "label": "Faber Agent"})

    console.log(invitationJSON)

    // c_json = self.to_json()
    // c_i = bytes_to_b64(c_json.encode("ascii"), urlsafe=True)
    // result = urljoin(base_url or self.endpoint or "", "?c_i={}".format(c_i))
    // return result

    `   
The "establish connection" protocol enables two agents to establish a connection through a series of messages 
    - an invitation, a connection request and a connection response.

    in the connection protocol, the messages are "invitation", "connectionRequest" and "connectionResponse", 
    the roles are "inviter" and "invitee", and the states are "invited", "requested" and "connected".

    #5 Create a connection to alice and print out the invite details
        Generate invitation duration: 0.02s
        Invitation response:
        {
            "connection_id": "f56b89dd-a321-443a-a2e4-a0a4463c939e",
            "invitation": {
                "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/connections/1.0/invitation",
                "@id": "91ad9b65-b366-4dd2-96f9-2a92670a838b",
                "recipientKeys": [
                    "B4u3YTNsdXa5pUkhpKWbXatxTh8APrJmDnnW1vXJDww1"
                ],
                "serviceEndpoint": "http://172.17.0.1:8020",
                "label": "Faber Agent"
            },
            "invitation_url": "http://172.17.0.1:8020?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiOTFhZ
                                DliNjUtYjM2Ni00ZGQyLTk2ZjktMmE5MjY3MGE4MzhiIiwgInJlY2lwaWVudEtleXMiOiBbIkI0dTNZVE5zZFhhNXBVa2hwS1diWGF0eFRoOEFQckptRG5uVzF2WEpEd3cxIl0sICJzZXJ2aWNlRW5kcG9pbnQiOiAiaHR0
                                cDovLzE3Mi4xNy4wLjE6ODAyMCIsICJsYWJlbCI6ICJGYWJlciBBZ2VudCJ9"
        }

    // CONNECTION INVITATION
    {
        "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/connections/1.0/invitation", 
        "@id": "91ad9b65-b366-4dd2-96f9-2a92670a838b", 
        "recipientKeys": ["B4u3YTNsdXa5pUkhpKWbXatxTh8APrJmDnnW1vXJDww1"], 
        "serviceEndpoint": "http://172.17.0.1:8020", 
        "label": "Faber Agent"
    }

    `

`
    """
    Convert an invitation to URL format for sharing.
    Returns:
        An invite url
    """
    c_json = self.to_json()
    c_i = bytes_to_b64(c_json.encode("ascii"), urlsafe=True)
    result = urljoin(base_url or self.endpoint or "", "?c_i={}".format(c_i))
    return result

`



}


function toUrl() {
    `
    """
    Convert an invitation to URL format for sharing.
    Returns:
        An invite url
    """
    `

    
}


module.exports = createConnectionRequest