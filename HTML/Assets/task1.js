function buildJSON(graph) {

    //so graph has no way of getting the # of nodes... guess i have to start with edges

    var links = graph.getLinks();//edges
    for (i = 0; i < links.length; i++) {
        var prevId = links[i].getPrevNode();
        var nextId = links[i].getNextNode();
        var defaultsai = links[i].getDefaultSAI();
        var correctorincorrect = links[i].isCorrect()

        //add nodes if necessary
        if (!addedNodes.includes(prevId)) {
            var prevNode = graph.getNode(prevId);
            var pos = prevNode.getVisualData();
            addNode(jsonGraph, prevId, pos ? parseInt(pos.x) : null, pos ? parseInt(pos.y) : null);
            addedNodes.push(prevId);
        }
        if (!addedNodes.includes(nextId)) {
            var nextNode = graph.getNode(nextId);
            var pos = nextNode.getVisualData();
            addNode(jsonGraph, nextId, pos ? parseInt(pos.x) : null, pos ? parseInt(pos.y) : null);
            addedNodes.push(nextId);
        }
        addEdge(jsonGraph, links[i].getUniqueID(), prevId, nextId,
                defaultsai.getSelection(), defaultsai.getAction(), defaultsai.getInput(), correctorincorrect);
        addedEdges.push(links[i].getUniqueID());
    }
    BRDjson = jsonGraph;

    return JSON.stringify(jsonGraph);
}
var BRDjson = null;

function addNode(jsonGraph, id, x, y) {
    if (x == null) {
        var node = {
            group: 'nodes',

            data: {
                id: id
            },

            scratch: {

            },

            selected: false,

            selectable: true,

            locked: false,

            grabbable: true
        };
        jsonGraph.elements.push(node);
    }
    else {
        var node = {
            group: 'nodes',

            data: {
                id: id
            },

            scratch: {

            },

            position: {
                x: x,
                y: y
            },

            selected: false,

            selectable: true,

            locked: false,

            grabbable: true
        };
        jsonGraph.elements.push(node);
    }
}

function addEdge(jsonGraph, id, source, target, selection, action, input, correctorincorrect) {
    var edge = {
        group: 'edges',

        data: {
            id: "-"+id,
            CTATid: id,
            source: source,
            target: target,
            selection: selection,
            action: action,
            input: input,
            info: "["+selection+","+action+","+input+"]",
            info2: "["+selection+","+input+"]",
            correctorincorrect: correctorincorrect
                  }
    };
    jsonGraph.elements.push(edge);
}
