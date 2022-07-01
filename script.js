let data = []
const dotsNum = 100

const width = window.innerWidth - 16
const height = window.innerHeight - 140

const svg = d3.select("#svg")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

const g = svg.append("g")

const zoom = d3.zoom()
  .scaleExtent([0.5, 5])
  .on("zoom", handleZoom)

function handleZoom(e) {
  d3.select("g")
    .attr("transform", e.transform)
}

function initZoom() {
  d3.select("svg")
    .call(zoom)
}

function updateData() {
  data = []
  for (let i = 0; i < dotsNum; i++) {
    data.push({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height
    })
  }
}

function update() {
  d3.select("svg g")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 10)
    .attr("class", "circle")
    .attr("fill", () => {
      const colors = ["blue", "gray", "beige"]
      return colors[Math.floor(Math.random() * colors.length)]
    })
    .on("click", (e, d) => {
      number.innerText = "Dot number is: " + d.id
    })
}

function resetScreen() {
  d3.select("svg")
    .transition()
    .call(zoom.translateTo, 0.5 * width, 0.5 * height)
    .transition()
    .call(zoom.scaleTo, 1)
}

const node = document.getElementById("dotnumber")
const number = document.createElement("p")
number.innerText = "Click dot to display number."
node.appendChild(number)

initZoom()
updateData()
update()


