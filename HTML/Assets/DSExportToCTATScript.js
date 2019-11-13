var students = new Set();
var pathflag;
var problemsAndPaths = {};
var problems = [];
var cy;
var edgesToHide, nodesToHide;
var graph;
var edgeFreqs = {};
var allPaths;
var cy2;
var ui;
var PT = null;
var ChosenUI;
var interfaceFilePath;
var elts = [];
var g = null;
// function runTask2() {
//     //console.log("button pressed");
//
//     g = CTAT.ToolTutor.tutor.getGraph();
//     /*var Gjson = buildJSON(g, []);
//     console.log("Gjson", Gjson);
//     cy.json(JSON.parse(Gjson));
//     var layout = cy.layout({name: 'cose'});
//     layout.run();*/
//     runTask1GivenJSON(g);
// }


function getInterface() {
    interfaceFilePath = null;
    location.search.split(/[?&]/).forEach(function(q) {
        let NV=q.split(/=/);
        if(NV.length>1 && NV[0]=="interfaceFilePath")
            interfaceFilePath=NV[1]
    });
    interfaceFilePath = (interfaceFilePath || document.getElementById('fileItem2').files[0]);
    console.log('getInterface', interfaceFilePath)
}

function OpenInterface() {
    getInterface();
    console.log('Open Interface', interfaceFilePath)
    ChosenUI= window.open(interfaceFilePath.name+"?question_file="+ CTATConfiguration.get('question_file'), "ctatinterface");
}

function addPathToBG(correct) {
    console.log("addPathToBG called");
    path = cy.$(":selected");

    path.forEach(function(ele) {
        if (!ele.isNode()) {
            if (!("correct" in ele.data())) {
                if (correct==1)
                    ele.json({data : {correct: 1}})
                else if (correct==0)
                    ele.json({data : {correct: 0}})
                else
                    ele.json({data : {correct: -1}})
            }
        }
    });
}

CTATPathTracer = function(graphDivID, givenInterfaceFilePath){
    var interfaceFilePath = givenInterfaceFilePath||"interfaceFilePath";
    var cytoDivID = graphDivID||"cy";
    var cyContainer= document.getElementById(cytoDivID);
    var flagg = false;
    ChosenUI = null;
    var g = CTAT.ToolTutor.tutor.getGraph();
    cy = cytoscape({                                   //runTask1GivenJSON(ggraph) {
        container: cyContainer,
        hideLabelsOnViewport: true
    });
    assocRulesListener =
    {
      processCommShellEvent: function(evt, msg)
      {
        console.log('evt',evt, msg);
        if("AssociatedRules" != evt || !msg)
        {
            return;
        }
        var indicator = msg.getIndicator();
        var lin = msg.getProperty("StepID");
        var sai = "["+msg.getProperty("StudentSelection")+","+msg.getProperty("StudentAction")+","+msg.getProperty("StudentInput")+"]";//msg.getSAI();                               // selection-action-input from tutor engine
        console.log("indicator",indicator,"indicator",sai.toString(),"getProperty",msg.getXMLString(true));
        // highlightedge=cy.getElementById("39-89-36");
        // console.log("edge", highlightedge);
        // if("correct" == indicator.toLowerCase())
        highlightedge=null;
        if(msg.getProperty("TraceOutcome")=="Correct Action")
        {
          lind = parseInt(lin,10);
          highlightedge=cy.getElementById("-"+lin);
          highlightedge.select();
          console.log(highlightedge);
          console.log(cy);
        }
        else if (msg.getProperty("TraceOutcome")=="Buggy Action")
        {
          highlightedge=cy.edges().filter(function(ele) {
              return ele.data('info') == sai.toString();
          })
          highlightedge.select();
        }
        if(highlightedge==null)               //highlightedge.length==0)
        {
          //add demonstrate mode here
          cy.elements().makeLayout();
        }
        //var selection = (sai ? sai.getSelection() : "_noSuchComponent_");
        //var comps = CTATShellTools.findComponent(selection);  // array of components with this name
        //var component = (comps && comps.length ? comps[0] : null);
        //if(component && "incorrect" == indicator.toLowerCase())
        //{
        //    console.log("Tutor's answer is "+sai.toString());
        //}
      }
    };
    cy.json(JSON.parse(buildJSON(g, {})));
    var layout = cy.layout({
                    name: 'cose',
                    fit: true,
                    padding: 30,
                    boundingBox: undefined,
                    nodeDimensionsIncludeLabels: false,
                    randomize: true,
                    componentSpacing: 40,
                    nodeRepulsion: function( node ){ return 1020480; },
                    nodeOverlap: 4,
                    idealEdgeLength: function( edge ){ return 50; },
                    edgeElasticity: function( edge ){ return 32; },
                    nestingFactor: 1.2,
                    gravity: 0.1
                 });
                 layout.run();
                 var currentnode=cy.getElementById(1);
                 currentnode.select();
                 cy.bind('click', 'node', function(nodeselected) {
                   PA=null;
                   pathflag=1;
                   console.log('ChosenUI', ChosenUI);
                   var destNodeID = nodeselected.target.id();
                   if (destNodeID==1)
                   {

                     ChosenUI= window.open(interfaceFilePath.name+"?question_file="+ CTATConfiguration.get('question_file'), "ctatinterface");
                     window.onmessage(function(m){console.log("m",m);});
                     return;
                   }
                   console.log('node clicked: ', nodeselected.target.id(), destNodeID);
                   var destNode = g.getNode(destNodeID);
                   console.log("ChosenUI.CTAT.ToolTutor.tutor", ChosenUI.CTAT.ToolTutor.tutor);
                   ChosenUI.CTAT.ToolTutor.tutor.goToState(destNode.getNodeName());
                   let tp = g.getBestSubpath(g.getStartNode(), destNode);
                   if (tp == null)
                   {
                       //tp = findPathToNode(destNode, null); //cy.getElementById(1),
                       console.log("tp",tp);
                   }
                   PA =tp.getSortedLinks();


                   console.log("PA",PA);
                   // PA.forEach(function(link){
                   //     console.log('link', link);
                   //     ChosenUI.CTATCommShell.commShell.processComponentAction(link.getDefaultSAI());
                   // });
                   window.onmessage(function(m){console.log("m",m);});
                 });
                 //document.getElementById("cy").ondblclick = function(e) {cy.$(':selected').remove();};
                 /*var nid = 23;
                 document.getElementById("cy").ondblclick = function(e) {
        cy.add({ data: { id: nid }, renderedPosition: { x: e.x, y: e.y } });
        nid++;
        };
                         ,{data: { id: nid+e.target.id(), source: nodeselected.target.id(), target: nid}}
                         layout.pon('layoutstop').then(function( event ){
                             cy.nodes().positions(function(node, i){
                                 return CTAT.ToolTutor.tutor.getGraph().getNode(node.data().id).getDimension();
                                 });
                             });*/
    //console.log('instanceisactive', instance.isActive());


    // function selectPath(PA) {
    //   cy.getElementById(1).select();
    //   cy.getElementById(PA[0].getPrevNode()).select();
    //   cy.getElementById("-"+PA[0].getUniqueID()).select();
    //   PA.forEach(function(link){
    //       // cy.getElementById(link.getPrevNode()).select();
    //       // cy.getElementById("-"+link.getUniqueID()).select();
    //   });
    // };

    function getInterface() {
        interfaceFilePath = null;
        location.search.split(/[?&]/).forEach(function(q) {
            let NV=q.split(/=/);
            if(NV.length>1 && NV[0]=='interfaceFilePath')
                interfaceFilePath=NV[1]
        });
        interfaceFilePath = (interfaceFilePath || document.getElementById('interfaceFilePath').files[0]);
        console.log('getInterface', interfaceFilePath)
    };

    this.OpenInterface = function() {
        getInterface();
        console.log('Open Interface', interfaceFilePath)
        ChosenUI= window.open(interfaceFilePath.name+"?question_file="+ CTATConfiguration.get('question_file'), "ctatinterface");
        flagg=true;
    }

    this.findPathToNode = function(n, p) {
        var destnode = g.getNode(4);
        console.log(destnode);
        var inLinks = destnode.getInLinks();
        if(inLinks.size <= 0)
        {
            p = p||new CTATExampleTracerPath();
        }
        else
        {
            var e = inLinks.keys().next().value;
            p = this.findPathToNode(g.getNode(e.getPrevNode()), p);
            p.addLink(e);
        }
        return p;
    }


    this.addListener = function(assocRulesListener) {
        ChosenUI.CTATCommShell.commShell.addGlobalEventListener(assocRulesListener)
    }
}
//
// function getSelectedPath() {
//     console.log("called");
//     //get all selected nodes
//     var selectedNodes = cy.$(":selected");
//     if (selectedNodes.length < 1)
//         return null;
//     var firstSelect = selectedNodes[0];
//     console.log(firstSelect);
//     var root = cy.$('node[id="0"]');
//     //use dijkstra's to get path
//     var dijkstra = cy.elements().dijkstra('node[id="0"]',
//         function() {
//               return 1;
//             }, false);
//     var path = dijkstra.pathTo(firstSelect);
//     path.select();
//
//     //first log the SAIs in path
//     path.edges().forEach(function(edge) {
//         console.log(edge.data("info"))
//     });
//     return path;
// }
//
//
//
//
//
//
// function addPathXToInterface() {
//     console.log("addPathXToInterface called");
//
//     getInterface();
//
//     cy.$().unselect();
//     x = document.getElementById("currentPathNum").value;
//     pathNum = parseInt(x);
//     console.log(x);
//     if (!isNaN(pathNum)) {
//         path = allPaths[pathNum-1];
//         path.select();
//         var msgs = [], builder = new CTATTutoringServiceMessageBuilder();
//         path.edges().forEach(function(edge) {
//             msgs.push(builder.createInterfaceActionMessage(CTATGuid.guid(), new CTATSAI(edge.data("selection"),
//                                                                                         edge.data("action"),
//                                                                                         edge.data("input"))));
//         });
//         if (ui == null || ui.closed) {
//             //this is hardcoded-ish for now
//             ui=window.open(interfaceFilePath.name+"?question_file=../FinalBRDs/empty.brd&show_debug_traces=basic", "_blank");
//             ui.window.onload = (function() {
//                 console.log("onload");
//                 for(let m in msgs) ui.window.CTAT.ToolTutor.sendToInterface(msgs[m]);
//             }).bind(this);
//             ui.window.onclose = (function() {
//                 ui = null;
//             }).bind(this);
//         }
//         else {
//             ui.window.close();
//             //we want to reset the UI somehow
//             ui=window.open(interfaceFilePath.name+"?question_file=../FinalBRDs/empty.brd&show_debug_traces=basic", "_blank");
//             ui.window.onload = (function() {
//                 console.log("onload");
//                 for(let m in msgs) ui.window.CTAT.ToolTutor.sendToInterface(msgs[m]);
//             }).bind(this);
//             ui.window.onclose = (function() {
//                 ui = null;
//             }).bind(this);
//             /*for(let m in msgs) {
//                 ui.window.CTAT.ToolTutor.sendToInterface(msgs[m]);
//             }*/
//         }
//     }
// }
//
//
// function addPathToInterface() {
//     console.log("addPathToInterface called");
//
//     getInterface();
//
//     //get all selected nodes/edges
//     //path = getSelectedPath();
//     path = cy.$(":selected");
//     /*var selectedNodes = cy.$(":selected");
//     var firstSelect = selectedNodes[0];
//     var root = cy.$('node[id="0"]');
//     //use dijkstra's to get path
//     var dijkstra = cy.elements().dijkstra('node[id="0"]',
//         function() {
//               return 1;
//             }, false);
//     var path = dijkstra.pathTo(firstSelect);
//     */
//     //path.select();
//
//     //first log the SAIs in path
//     path.edges().forEach(function(edge) {
//         console.log(edge.data("info"))
//
//     });
//
//
//     //now we need to pass it on somehow
//     var msgs = [], builder = new CTATTutoringServiceMessageBuilder();
//     path.edges().forEach(function(edge) {
//         msgs.push(builder.createInterfaceActionMessage(CTATGuid.guid(), new CTATSAI(edge.data("selection"),
//                                                                                     edge.data("action"),
//                                                                                     edge.data("input"))));
//     });
//
//     msgs.forEach(function(msg) {
//         console.log(msg)
//     });
//
//     if (ui == null || ui.closed) {
//         ui=window.open(interfaceFilePath.name+"?question_file=empty.brd&show_debug_traces=basic", "_blank");
//         ui.window.onload = (function() {
//             for(let m in msgs) ui.window.CTAT.ToolTutor.sendToInterface(msgs[m]);
//         }).bind(this);
//         ui.window.onclose = (function() {
//             ui = null;
//         }).bind(this);
//     }
//     else {
//         /*for(let m in msgs) {
//             ui.window.CTAT.ToolTutor.sendToInterface(msgs[m]);
//         }*/
//         ui.window.close();
//         //we want to reset the UI somehow
//         ui=window.open(interfaceFilePath.name+"?question_file=../FinalBRDs/empty.brd&show_debug_traces=basic", "_blank");
//         ui.window.onload = (function() {
//             console.log("onload");
//             for(let m in msgs) ui.window.CTAT.ToolTutor.sendToInterface(msgs[m]);
//         }).bind(this);
//         ui.window.onclose = (function() {
//             ui = null;
//         }).bind(this);
//     }
//
//
//     /*
//     ui=window.open("fractionAddition.html?question_file=empty.brd&show_debug_traces=basic", "_blank");
//     ui.window.onload = (function() {
//         console.log("hi");
//         for(let m in msgs) ui.window.CTAT.ToolTutor.sendToInterface(msgs[m]);
//     }).bind(this);*/
//
//     //why is it that when I copypaste this into console, it works
//     //but when i run it through the button, it doesn't work?
//     //oh I changed it from this.msgs to msgs...
//     //idk if the bind() is necessary?
// }
//
//
//
// function runTask1GivenJSON(ggraph) {
//     cy = cytoscape({
//         container: document.getElementById('cy'),
//         hideLabelsOnViewport: true
//     });
//     /*cy2 = cytoscape({
//         container: document.getElementById('cy2'),
//         hideLabelsOnViewport: true
//     });
//
//     cy2.json({
//         style: [
//             {
//                 selector: 'node',
//                 style: {'background-color': 'green',
//                         'label': 'data(id)',
//                         "text-valign": "center",
//                         "text-halign": "center"
//                 }
//             },
//
//             {
//                 selector: 'node[id="0"]',
//                 style: {'background-color': 'purple',
//                         'label': 'data(id)',
//                         "text-valign": "center",
//                         "text-halign": "center"
//                 }
//             },
//
//             {
//                 selector: 'edge[?correct]',
//                 style: {'line-color': 'blue',
//                         'target-arrow-color': 'blue',
//                         'label': 'data(info)',
//                         //'width': 'mapData(freq, 0, '+maxFreq+', 1, 20)',
//                         'target-arrow-shape': 'triangle',
//                         'curve-style': 'bezier',
//                         'min-zoomed-font-size': '10'
//                 }
//             },
//
//             {
//                 selector: 'edge[!correct]',
//                 style: {'line-color': 'red',
//                         'target-arrow-color': 'red',
//                         'label': 'data(info)',
//                         //'width': 'mapData(freq, 0, '+maxFreq+', 1, 20)',
//                         'target-arrow-shape': 'triangle',
//                         'curve-style': 'bezier',
//                         'min-zoomed-font-size': '10'
//                 }
//             }
//         ]
//     });*/
//
//
//
//
//
//     if(ggraph)
//     {
//         graph = ggraph;
//     }
//     else
//     {
//         buildGraphForProblem();  //sets global graph
//     }
//     //console.log("button pressed 2");
//     cy.json(JSON.parse(buildJSON(graph, edgeFreqs)));
//     var layout = cy.layout({
//                     name: 'cose',
//                     fit: true,
//                     padding: 30,
//                     boundingBox: undefined,
//                     nodeDimensionsIncludeLabels: false,
//                     randomize: true,
//                     componentSpacing: 40,
//                     nodeRepulsion: function( node ){ return 1020480; },
//                     nodeOverlap: 4,
//                     idealEdgeLength: function( edge ){ return 50; },
//                     edgeElasticity: function( edge ){ return 32; },
//                     nestingFactor: 1.2,
//                     gravity: 0.1
//                  });
//
//         layout.pon('layoutstop').then(function( event ){
//             cy.nodes().positions(function(node, i){
//                 return CTAT.ToolTutor.tutor.getGraph().getNode(node.data().id).getDimension();
//                 });
//             });
//
//     layout.run();
//
//
//     allPaths = [];
//     cy.nodes().leaves().forEach(function(leaf) {
//         var dijkstra = cy.elements().dijkstra('node[id="0"]',
//             function() {
//                   return 1;
//                 }, false);
//         var path = dijkstra.pathTo(leaf);
//         allPaths.push(path);
//     });
//
//     pathFreqs = [];//entries are [original index, path freq]
//     for (var i = 0; i < allPaths.length; i++) {
//         //freq of path i = min freq of its edges
//         total = 0;
//         allPaths[i].edges().forEach(function(e){total += e.data("freq")});
//         //pathFreqs[i] = [i,allPaths[i].edges().min(function(e){return e.data("freq")})];
//         //or instead do average freq because that's probably more useful it seems
//         pathFreqs[i] = [i,total/allPaths[i].edges().length];
//     }
//     pathFreqs.sort(function(a,b) {return b[1]-a[1]});
//     sortedAllPaths = []
//     for (var i = 0; i < allPaths.length; i++) {
//         sortedAllPaths.push(allPaths[pathFreqs[i][0]])
//     }
//     allPaths = sortedAllPaths
//
//     cy.nodes().on('select', function(event) {
//             getSelectedPath();
//     });
//
//
//
//     document.getElementById("N_form").value = allPaths.length
//     document.getElementById("N_form").text = allPaths.length
//
//     //populate overall info fields
//     document.getElementById("numStudents").value = students.size;
//     document.getElementById("numProblems").value = problems.length;
//
//     //populate problem-specific info
//     //need to update on switching problem too...
//     pathLens = allPaths.map(function(path) {//path length is = to # of edges
//         return path.edges().length;
//     });
//     totalLen = 0;
//     for (i=0;i<pathLens.length;i++) {
//         totalLen += pathLens[i];
//     }
//     document.getElementById("averagePathLength").value = Math.round(totalLen/pathLens.length)
//     document.getElementById("longestPath").value = Math.min(...pathLens)
//     document.getElementById("shortestPath").value = Math.max(...pathLens)
//
//     var chosenProblem = 0;
//     var problemRadios = document.getElementsByName("problem");
//     for (var k = 0; k < problems.length; k++) {
//         if (problemRadios[k].checked) {
//             chosenProblem = k;
//             break;
//         }
//     }
//
//     if(ggraph)
//         return;
//     document.getElementById("numStudentsProblem").value = Object.entries(problemsAndPaths[problems[chosenProblem]]).length;
//
//     totalSAIs=0;
//     objectified = Object.entries(edgeFreqs)
//     objectified.forEach(function(entry) {totalSAIs += entry[1]});
//     document.getElementById("numSAIs").value = totalSAIs;
//
//     //totalSAs = 0;
//     allSAs = {};
//     bigArray = Object.entries(problemsAndPaths)
//     for (var problemInd = 0; problemInd < bigArray.length; problemInd++) {
//         problemArray = Object.entries(bigArray[problemInd][1]);
//         for (var studentInd = 0; studentInd < problemArray.length; studentInd++) {
//             saiList = Object.entries(problemArray[studentInd][1])
//             for (var SAind = 0; SAind < saiList.length; SAind++) {
//                 if (!allSAs.hasOwnProperty(saiList[SAind][0])) {
//                     allSAs[saiList[SAind][0]] = 1;
//                 }
//             }
//         }
//     }
//
//     //totalSAs = Object.entries(allSAs)
//     document.getElementById("numSAs").value = Object.entries(allSAs).length;
//
//     document.getElementById("averageEdgeFrequency").value = Math.round(totalSAIs/objectified.length)
//
//     document.getElementById("currentPathNum").value = 1//reset
// }
