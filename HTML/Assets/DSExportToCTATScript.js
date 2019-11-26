//This is for saving the layout configuration for an user so next time they open it remains the same.
//JSON.stringify(myLayout.toConfig())
//myLayout = new window.GoldenLayout(JSON.parse('{"settings":{"hasHeaders":true,"constrainDragToContainer":true,"reorderEnabled":true,"selectionEnabled":false,"popoutWholeStack":false,"blockedPopoutsThrowError":true,"closePopoutsOnUnload":true,"showPopoutIcon":true,"showMaximiseIcon":true,"showCloseIcon":true,"responsiveMode":"onload"},"dimensions":{"borderWidth":5,"minItemHeight":10,"minItemWidth":10,"headerHeight":20,"dragProxyWidth":300,"dragProxyHeight":200},"labels":{"close":"close","maximise":"maximise","minimise":"minimise","popout":"open in new window","popin":"pop in","tabDropdown":"additional tabs"},"content":[{"type":"row","isClosable":true,"reorderEnabled":true,"title":"","content":[{"type":"stack","width":50,"isClosable":true,"reorderEnabled":true,"title":"","activeItemIndex":0,"content":[{"type":"component","componentName":"Behavior Graph","componentState":{"text":"Component 1"},"isClosable":true,"reorderEnabled":true,"title":"Behavior Graph"}]},{"type":"column","isClosable":true,"reorderEnabled":true,"title":"","width":50,"content":[{"type":"stack","height":65.5048076923077,"isClosable":true,"reorderEnabled":true,"title":"","activeItemIndex":0,"content":[{"type":"component","componentName":"HTML Interface","componentState":{"text":"Component 2"},"isClosable":true,"reorderEnabled":true,"title":"HTML Interface"}]},{"type":"stack","isClosable":true,"reorderEnabled":true,"title":"","height":34.495192307692314,"activeItemIndex":0,"content":[{"type":"component","componentName":"Hints","componentState":{"text":"Component 3"},"isClosable":true,"reorderEnabled":true,"title":"Hints"},{"type":"component","componentName":"SAI Matcher","componentState":{"text":"Component 4"},"isClosable":true,"reorderEnabled":true,"title":"SAI Matcher"}]}]}]}],"isClosable":true,"reorderEnabled":true,"title":"","openPopouts":[],"maximisedItemId":null}'), $('#layoutContainer'))
//myLayout.config=JSON.parse('{"settings":{"hasHeaders":true,"constrainDragToContainer":true,"reorderEnabled":true,"selectionEnabled":false,"popoutWholeStack":false,"blockedPopoutsThrowError":true,"closePopoutsOnUnload":true,"showPopoutIcon":true,"showMaximiseIcon":true,"showCloseIcon":true,"responsiveMode":"onload"},"dimensions":{"borderWidth":5,"minItemHeight":10,"minItemWidth":10,"headerHeight":20,"dragProxyWidth":300,"dragProxyHeight":200},"labels":{"close":"close","maximise":"maximise","minimise":"minimise","popout":"open in new window","popin":"pop in","tabDropdown":"additional tabs"},"content":[{"type":"row","isClosable":true,"reorderEnabled":true,"title":"","content":[{"type":"stack","width":50,"isClosable":true,"reorderEnabled":true,"title":"","activeItemIndex":0,"content":[{"type":"component","componentName":"Behavior Graph","componentState":{"text":"Component 1"},"isClosable":true,"reorderEnabled":true,"title":"Behavior Graph"}]},{"type":"column","isClosable":true,"reorderEnabled":true,"title":"","width":50,"content":[{"type":"stack","height":65.5048076923077,"isClosable":true,"reorderEnabled":true,"title":"","activeItemIndex":0,"content":[{"type":"component","componentName":"HTML Interface","componentState":{"text":"Component 2"},"isClosable":true,"reorderEnabled":true,"title":"HTML Interface"}]},{"type":"stack","isClosable":true,"reorderEnabled":true,"title":"","height":34.495192307692314,"activeItemIndex":0,"content":[{"type":"component","componentName":"Hints","componentState":{"text":"Component 3"},"isClosable":true,"reorderEnabled":true,"title":"Hints"},{"type":"component","componentName":"SAI Matcher","componentState":{"text":"Component 4"},"isClosable":true,"reorderEnabled":true,"title":"SAI Matcher"}]}]}]}],"isClosable":true,"reorderEnabled":true,"title":"","openPopouts":[],"maximisedItemId":null}')
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
var modifiedmsg;

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


CTATPathTracer = function(graphDivID, givenInterfaceFilePath){
    var interfaceFilePath = givenInterfaceFilePath||"interfaceFilePath";
    var cytoDivID = graphDivID||"cy";
    var cyContainer= document.getElementById(cytoDivID);
    var flagg = false;
    var graphName = location.toString().substring(location.toString().lastIndexOf("/") + 1)
    ChosenUI = null;
    g = CTAT.ToolTutor.tutor.getGraph();
    cy = cytoscape({
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
        if("InCorrectAction" == evt || msg)
        {
          modifiedmsg=msg;
        }
        cy.edges().removeClass('highlighted');
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
          //var ret = highlightedge[0].id().replace("-",'');
          //currentnode=cy.getElementById(g.getLinkByID(parseInt(ret, 10)).getNextNode());
        }
        else if (msg.getProperty("TraceOutcome")=="Buggy Action")
        {
          highlightedge=cy.edges().filter(function(ele) {
              return ele.data('info') == sai.toString();
          })
          highlightedge.addClass('highlighted');
          //var ret = highlightedge[0].id().replace("-",'');
          //currentnode=cy.getElementById(g.getLinkByID(parseInt(ret, 10)).getNextNode());
        }
        console.log("highlightedge",highlightedge,"jhnj",msg.getProperty("TraceOutcome"));
        var selectMode = document.getElementById("mySelect").value;
        currentnode = cy.getElementById(ChosenUI.CTAT.ToolTutor.tutor.getTracer().findCurrentState())
        console.log("currentnode",currentnode);
        if(highlightedge==null && selectMode=="Demonstrate")
        {
          //add demonstrate mode here for cytoscape
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
          newLink.setActionType("Correct Action");
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
            //currentnode=cy.getElementById(addNodeId);
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
    //currentnode=cy.getElementById(1);
    //currentnode.select();
                 /*document.getElementById("cy").ondblclick = function(e) {cy.$(':selected').remove();};
                 var nid = 23;

                         ,{data: { id: nid+e.target.id(), source: nodeselected.target.id(), target: nid}}
                         layout.pon('layoutstop').then(function( event ){
                             cy.nodes().positions(function(node, i){
                                 return CTAT.ToolTutor.tutor.getGraph().getNode(node.data().id).getDimension();
                                 });
                             });*/

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

    function findPathToNode(n, p) {
        var inLinks = n.getInLinks();
        if(inLinks.size <= 0)
        {
            p = p||new CTATExampleTracerPath();
        }
        else
        {
            var e = inLinks.keys().next().value;
            p = findPathToNode(g.getNode(e.getPrevNode()), p);
            p.addLink(e);
        }
        return p;
    }

    cy.bind('click', 'node', function(nodeselected) {
      cy.edges().removeClass('highlighted');
      PA=null;
      pathflag=1;
      var destNodeID = nodeselected.target.id();
      //currentnode=cy.getElementById(destNodeID);
      if (destNodeID==1)
      {
        ChosenUI= window.open(interfaceFilePath.name+"?question_file="+ CTATConfiguration.get('question_file'), "ctatinterface");
        window.onmessage(function(m){console.log("m",m);});
        return;
      }
      var destNode = g.getNode(destNodeID);
      let tp = g.getBestSubpath(g.getStartNode(), destNode);
      if (tp == null)     //for buggy edges now change later such that it will only be for nodes which cannot be reached
      {
          tp = findPathToNode(destNode);
          PA =tp.getSortedLinks();
          var newdest = g.getNode(PA[PA.length-1].getPrevNode());
          ChosenUI.CTAT.ToolTutor.tutor.goToState(newdest.getNodeName());
      }
      else {
        ChosenUI.CTAT.ToolTutor.tutor.goToState(destNode.getNodeName());
        PA =tp.getSortedLinks();
        pathflag=0;
      }
      console.log("PA",PA);
      //   PA.forEach(function(link){
      //         cy.getElementById(link.getNextNode()).unselect();
      //         cy.getElementById("-"+link.getUniqueID()).select();
      //   });
      window.onmessage(function(m){console.log("m",m);});
    });
}
