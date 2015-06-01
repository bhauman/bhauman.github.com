"use strict";

var Reloader = Reloader || {};

Reloader.reload_file = function (path) {
  var x = document.createElement("script");
  x.setAttribute("src", path + "?rel=" + new Date().getTime());
  document.body.appendChild(x);
  setTimeout(function () {
    document.body.removeChild(x);
  }, 1000);
};

Reloader.start_reloading = function (files) {
  setTimeout(function () {
    console.log("--- reloading ---");
    files.map(Reloader.reload_file);
  }, 1000);
};

//Reloader.start_reloading(["build/yome.js"])

function l(x) {
  console.log(x);return x;
}

var Yome = Yome || {};

Yome.initialState = function () {
  return { sides: [1, 2, 3, 4, 5, 6, 7, 8].map(function () {
      return new Object();
    }) };
};

Yome.state = Yome.state || Yome.initialState();

Yome.sideCount = function (st) {
  return st.sides.length;
};

Yome.sliceTheta = function (st) {
  return 2 * Math.PI / Yome.sideCount(st);
};

Yome.sliceDeg = function (st) {
  return 360 / Yome.sideCount(st);
};

Yome.rotate = function (theta, point) {
  var sint = Math.sin(theta),
      cost = Math.cos(theta);
  return { x: point.x * cost - point.y * sint,
    y: point.x * sint + point.y * cost };
};

Yome.radialPoint = function (radius, theta) {
  return Yome.rotate(theta, { x: 0, y: radius });
};

Yome.sidePoints = function (st) {
  return st.sides.map(function (_, i) {
    return Yome.radialPoint(180, i * Yome.sliceTheta(st));
  });
};

Yome.pointsToPointsString = function (points) {
  return points.map(function (p) {
    return p.x + "," + p.y;
  }).join(" ");
};

Yome.drawWalls = function (st) {
  return React.createElement("polygon", { points: Yome.pointsToPointsString(Yome.sidePoints(st)) });
};

Yome.svgWorld = function (children) {
  return React.createElement(
    "svg",
    { height: "500", width: "500", viewBox: "-250 -250 500 500",
      preserveAspectRatio: "xMidYMid meet" },
    children
  );
};

Yome.playArea = function (children) {
  return React.render(Yome.svgWorld(children), document.getElementById("playarea"));
};

Yome.clearPlayArea = function () {
  return React.unmountComponentAtNode(document.getElementById("playarea"));
};

//Yome.playArea(Yome.drawWalls({sides: [1,2,3,4,5,6]})))
//Yome.playArea(Yome.drawWalls({sides: [1,2,3,4,5,6,7]}))
//Yome.playArea(Yome.drawWalls({sides: [1,2,3,4,5,6,7,8]}))

//Yome.clearPlayArea()

Yome.eventHandler = function (f) {
  return function (e) {
    e.preventDefault();f(e.target.value);Yome.render();
  };
};

Yome.changeSideCount = function (st) {
  return function (new_count) {
    var nArray = Array.apply(null, Array(parseInt(new_count)));
    st.sides = nArray.map(function (_, i) {
      return st.sides[i] || {};
    });
  };
};

Yome.sideOptions = function () {
  return ["HexaYome", "SeptaYome", "OctaYome"].map(function (l, v) {
    return React.createElement(
      "option",
      { value: v + 6 },
      l
    );
  });
};

Yome.sideCountInput = function (st) {
  return React.createElement(
    "div",
    { className: "top-control" },
    React.createElement(
      "span",
      null,
      " Size of Yome "
    ),
    React.createElement(
      "select",
      { onChange: Yome.eventHandler(Yome.changeSideCount(st)),
        value: Yome.sideCount(st) },
      Yome.sideOptions()
    )
  );
};

// draw window

Yome.windowPoints = function (st) {
  var theta = Yome.sliceTheta(st),
      indent = theta / 6;
  return [Yome.radialPoint(160, indent), Yome.radialPoint(160, theta - indent), Yome.radialPoint(100, theta / 2)];
};

Yome.drawWindow = function (st) {
  return React.createElement("polygon", { points: Yome.pointsToPointsString(Yome.windowPoints(st)),
    key: "window" });
};

// draw door

Yome.doorPoints = function (st) {
  var indent = Yome.sliceTheta(st) / 8;
  return [Yome.radialPoint(165, indent), Yome.radialPoint(165, -indent), Yome.radialPoint(90, -indent), Yome.radialPoint(90, indent)];
};

Yome.drawDoor = function (st) {
  return React.createElement("polygon", { points: Yome.pointsToPointsString(Yome.doorPoints(st)),
    key: "door-frame" });
};

Yome.drawStoveVent = function (st) {
  var theta = Yome.sliceTheta(st),
      point = Yome.radialPoint(155, 0);
  return React.createElement("ellipse", { cx: point.x, cy: point.y, rx: "14", ry: "8",
    key: "stove-vent" });
};

Yome.drawLine = function (line) {
  return React.createElement("line", { x1: line.start.x, y1: line.start.y, x2: line.end.x, y2: line.end.y });
};

Yome.drawZipDoor = function (st) {
  var theta = Yome.sliceTheta(st),
      indent = 0.15 * (theta / 6),
      lines = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (x) {
    var dist = 170 - 10 * x;
    return { start: Yome.radialPoint(dist, -indent),
      end: Yome.radialPoint(dist, indent) };
  });
  lines.push({ start: Yome.radialPoint(180, 0),
    end: Yome.radialPoint(90, 0) });
  return React.createElement(
    "g",
    null,
    lines.map(Yome.drawLine)
  );
};

Yome.itemRenderDispatch = {
  "window": Yome.drawWindow,
  "door-frame": Yome.drawDoor,
  "zip-door": Yome.drawZipDoor,
  "stove-vent": Yome.drawStoveVent };

Yome.itemRender = function (type, st) {
  return (Yome.itemRenderDispatch[type] || function (x) {
    return null;
  })(st);
};

Yome.exampleData = (function (state) {
  state.sides[0].face = "window";
  state.sides[0].corner = "zip-door";
  state.sides[3].face = "window";
  state.sides[5].corner = "door-frame";
  state.sides[5].face = "window";
  state.sides[7].corner = "stove-vent";
  return state;
})(Yome.initialState());

//l(JSON.stringify(Yome.exampleData))

Yome.sideSlice = function (st, i) {
  var side = st.sides[i];
  return React.createElement(
    "g",
    { transform: "rotate(" + Yome.sliceDeg(st) * i + ",0,0)" },
    Yome.itemRender(side.corner, st),
    Yome.itemRender(side.face, st)
  );
};

//Yome.playArea(Yome.sideSlice(Yome.exampleData, 5))
//Yome.playArea(Yome.sideSlice(Yome.exampleData, 0))

Yome.drawYome = function (st) {
  return React.createElement(
    "g",
    { transform: "rotate(" + Yome.sliceDeg(st) / 2 + ",0,0)" },
    Yome.drawWalls(st),
    st.sides.map(function (side, i) {
      return Yome.sideSlice(st, i);
    })
  );
};

//Yome.playArea(Yome.drawYome(Yome.exampleData))

// handling the corner controls

Yome.worldPosition = function (point) {
  return { x: point.x + 250, y: point.y + 250 };
};

// SIDE-EFFECT
Yome.addRemoveWindow = function (side, i) {
  return function (_) {
    return side.face = !side.face ? "window" : null;
  };
};

Yome.windowControl = function (st, side, i) {
  var theta = Yome.sliceTheta(st) * (i + 1),
      pos = Yome.worldPosition(Yome.radialPoint(200, theta)),
      add = !side.face;
  return React.createElement(
    "div",
    { className: "control-holder", style: { top: pos.y, left: pos.x } },
    React.createElement(
      "a",
      { className: "window-control-offset " + (add ? "add" : "remove"),
        onClick: Yome.eventHandler(Yome.addRemoveWindow(side, i)), href: "#" },
      add ? "+ window" : "- window"
    )
  );
};

Yome.windowControls = function (st) {
  return st.sides.map(function (side, i) {
    return Yome.windowControl(st, side, i);
  });
};

// corner control

// SIDE EFFECT
Yome.addRemoveCornerItem = function (type, side) {
  return function (_) {
    return side.corner = side.corner ? null : type;
  };
};

Yome.cornerControlStateClass = function (type, corner_type) {
  return !corner_type && "add" || corner_type == type && "remove" || "hidden";
};

Yome.cornerControlLink = function (type, side) {
  return React.createElement(
    "a",
    { className: Yome.cornerControlStateClass(type, side.corner),
      key: type, href: "#",
      onClick: Yome.eventHandler(Yome.addRemoveCornerItem(type, side)) },
    (side.corner ? "- " : "+ ") + type
  );
};

Yome.cornerControlLinks = function (side, i) {
  return ["stove-vent", "zip-door", "door-frame"].map(function (t) {
    return Yome.cornerControlLink(t, side);
  });
};

Yome.cornerControl = function (st, side, i) {
  var theta = Yome.sliceTheta(st) * (i + 0.5),
      pos = Yome.worldPosition(Yome.radialPoint(221, theta));
  return React.createElement(
    "div",
    { className: "control-holder", style: { top: pos.y, left: pos.x } },
    React.createElement(
      "div",
      { className: "corner-control-offset" },
      Yome.cornerControlLinks(side, i)
    )
  );
};

Yome.cornerControls = function (st) {
  return st.sides.map(function (side, i) {
    return Yome.cornerControl(st, side, i);
  });
};

Yome.yomeControls = function (st) {
  return React.createElement(
    "div",
    { className: "yome-controls" },
    Yome.windowControls(st),
    Yome.cornerControls(st)
  );
};

Yome.widget = function (st) {
  return React.createElement(
    "div",
    { className: "yome-widget" },
    Yome.sideCountInput(st),
    React.createElement(
      "div",
      { className: "yome-widget-body" },
      Yome.yomeControls(st),
      React.createElement(
        "svg",
        { height: "500", width: "500", viewBox: "-250 -250 500 500",
          preserveAspectRatio: "xMidYMid meet" },
        React.createElement(
          "g",
          { transform: "rotate(" + Yome.sliceDeg(st) / 2 + ",0,0)" },
          Yome.drawWalls(st),
          st.sides.map(function (side, i) {
            return Yome.sideSlice(st, i);
          })
        )
      )
    )
  );
};

Yome.render = function () {
  return React.render(Yome.widget(Yome.state), document.getElementById("app"))

  //Yome.render();
  ;
};