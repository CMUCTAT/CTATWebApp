var students = new Set();
var pathflag;
var problemsAndPaths = {};
var problems = [];
var cy;
var edgesToHide, nodesToHide;
var graph;
var allPaths;
var cy2;
var ui;
var currentnode;
var layout;

var PT = null;
var ChosenUI;
var interfaceFilePath;
var elts = [];
var g = null;


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
    var graphName = location.toString().substring(location.toString().lastIndexOf("/") + 1)
    ChosenUI = null;
    g = CTAT.ToolTutor.tutor.getGraph();
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
        highlightedge=null;
        if(msg.getProperty("TraceOutcome")=="Correct Action")
        {
          lind = parseInt(lin,10);
          highlightedge=cy.getElementById("-"+lin);
          highlightedge.select();
          console.log(cy);
          var ret = highlightedge[0].id().replace("-",'');
          currentnode=cy.getElementById(g.getLinkByID(parseInt(ret, 10)).getNextNode());
        }
        else if (msg.getProperty("TraceOutcome")=="Buggy Action")
        {
          highlightedge=cy.edges().filter(function(ele) {
              return ele.data('info') == sai.toString();
          })
          highlightedge.select();
          var ret = highlightedge[0].id().replace("-",'');
          currentnode=cy.getElementById(g.getLinkByID(parseInt(ret, 10)).getNextNode());
        }
        var selectMode = document.getElementById("mySelect").value;
        //layout.run();
        console.log("currentnode",currentnode);
        if(highlightedge==null && selectMode=="Demonstrate")
        {
          //add demonstrate mode here for cytoscape
          //var pos = currentnode.getVisualData();
          var addNodeId =  addedNodes.reduce(function(a, b) {
                        return Math.max(a, b);
                      });
          addNodeId=addNodeId+1;
          addNode(jsonGraph, addNodeId, null, null);
          addedNodes.push(addNodeId);
          var addEdgeId =  addedEdges.reduce(function(a, b) {
                        return Math.max(a, b);
                      });
          addEdgeId=addEdgeId+1;
          addEdge(jsonGraph, addEdgeId, currentnode.id(), addNodeId, msg.getProperty("StudentSelection"), msg.getProperty("StudentAction"), msg.getProperty("StudentInput"));
          addedEdges.push(addEdgeId);

          //add demonstrate mode here for CTAT
          var newNode = new CTATExampleTracerNode(addNodeId);
          g.addNode(newNode);
          var newLink = new CTATExampleTracerLink(addEdgeId, currentnode.id(), addNodeId);
          var SelectionMatchers = new CTATMatcher();
          var ActionMatchers = new CTATMatcher();
          var InputMatchers = new CTATMatcher();
          var actor = "Student";
          var vectorMatcher = new CTATVectorMatcher(SelectionMatchers, ActionMatchers, InputMatchers, actor);
          vectorMatcher.setDefaultSAI(new CTATSAI(msg.getProperty("StudentSelection"), msg.getProperty("StudentAction"), msg.getProperty("StudentInput"), "Student"));
          newLink.setMatcher(vectorMatcher);
          // OK so I need to make a new matcher and give it the selection, action, and input
          g.addLink(newLink, null); //don't worry about groups for now
          g.getNode(currentnode.id()).addOutLink(newLink);
          newNode.addInLink(newLink);

          cy.json(JSON.parse(buildJSON(g)));
          layout = cy.layout({
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
            highlightedge=cy.getElementById("-"+addEdgeId);
            highlightedge.select();
            currentnode=cy.getElementById(addNodeId);
        }
      }
    };
    cy.json(JSON.parse(buildJSON(g)));
    layout = cy.layout({
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
    currentnode=cy.getElementById(1);
    currentnode.select();
    cy.bind('click', 'node', function(nodeselected) {
      PA=null;
      pathflag=1;
      console.log('ChosenUI', ChosenUI);
      var destNodeID = nodeselected.target.id();
      currentnode=cy.getElementById(destNodeID);
      if (destNodeID==1)
      {
        ChosenUI= window.open(interfaceFilePath.name+"?question_file="+ CTATConfiguration.get('question_file'), "ctatinterface");
        window.onmessage(function(m){console.log("m",m);});
        return;
      }
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

    this.saveGraph = function() {
      CTATFS.writeFile(graphName, g.toXML(CTAT.ToolTutor.tutor));
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
