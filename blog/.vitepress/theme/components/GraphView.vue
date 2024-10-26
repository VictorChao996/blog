<template>
	<svg ref="svg" @mousemove="onMouseMove" @mouseleave="onMouseLeave"></svg>
</template>

<script>
	import * as d3 from "d3";
	import { graphData } from "../graphData.js";

	export default {
		data() {
			return {
				nodes: graphData.nodes,
				links: graphData.links,
				// nodes: [
				// 	{
				// 		id: "10_learning_from_junior_project",
				// 		name: "關於大三專題我學到的十件事",
				// 	},
				// 	{
				// 		id: "2022_review_and_2023_goal",
				// 		name: "2022 年度回顧 ＆ 2023 年目標",
				// 	},
				// 	{
				// 		id: "Archieved/api-examples",
				// 		name: "Archieved/api-examples",
				// 	},
				// 	{
				// 		id: "Archieved/markdown-examples",
				// 		name: "Archieved/markdown-examples",
				// 	},
				// 	{
				// 		id: "appworks_school_campus_program_graduate",
				// 		name: "AppWorks School Campus Program 3 結業心得",
				// 	},
				// 	{
				// 		id: "experiment",
				// 		name: "experiment",
				// 	},
				// 	{
				// 		id: "frontend_learning/frontend_w1",
				// 		name: "第一周-前端學習首月&意外插曲",
				// 	},
				// 	{
				// 		id: "frontend_learning/frontend_w2",
				// 		name: "第二周-JavaScript基礎&進階",
				// 	},
				// 	{
				// 		id: "frontend_learning/frontend_w3",
				// 		name: "第三周-初探Vue框架",
				// 	},
				// 	{
				// 		id: "frontend_learning/frontend_w4",
				// 		name: "第四周-vue基礎",
				// 	},
				// 	{
				// 		id: "frontend_learning/frontend_w5",
				// 		name: "第五周-JS DOM、PR、GSC",
				// 	},
				// 	{
				// 		id: "frontend_learning/frontend_w6",
				// 		name: "第六周-JS事件傳遞委派、貢獻GibHub專案",
				// 	},
				// 	{
				// 		id: "frontend_learning/frontend_w7",
				// 		name: "第七周-購買 Udemy Bootcamp 課程",
				// 	},
				// 	{
				// 		id: "frontend_learning/frontend_w8",
				// 		name: "第八周-複習 JS & 初步認識 AWS",
				// 	},
				// 	{
				// 		id: "intersection_deadlock",
				// 		name: "從Deadlock(死結)的觀點來分析黃色網狀線的作用",
				// 	},
				// 	{
				// 		id: "interview/appworks_school",
				// 		name: "AppWorks School Campus Program 面試",
				// 	},
				// 	{
				// 		id: "job_experience/Internship_experience_at_ikala",
				// 		name: "Internship Experience at iKala",
				// 	},
				// 	{
				// 		id: "lab_weird_experience",
				// 		name: "實驗室趣談",
				// 	},
				// 	{
				// 		id: "reading/1-recommand_a_book_for_you",
				// 		name: "為您挑選最適合的書籍-當書店店長遇上交友網站",
				// 	},
				// 	{
				// 		id: "reading/reading_post_start",
				// 		name: "書本閱讀系列-首篇",
				// 	},
				// ],
				// links: [
				// 	{
				// 		source: "lab_weird_experience",
				// 		target: "10_learning_from_junior_project",
				// 	},
				// ],
				simulation: null,
			};
		},
		mounted() {
			this.createGraph();
		},
		methods: {
			createGraph() {
				const width = 650; // 設定寬度
				const height = 600; // 設定高度

				const svg = d3
					.select(this.$refs.svg)
					.attr("width", width)
					.attr("height", height)
					.style("border", "2px solid #ccc") // 添加邊框
					.style("border-radius", "8px"); // 添加圓角邊框

				// 確保 links 中的 source 和 target 都存在於 nodes 中，並且類型一致
				this.links = this.links.filter(
					(link) =>
						this.nodes.find(
							(node) => node.id === String(link.source)
						) &&
						this.nodes.find(
							(node) => node.id === String(link.target)
						)
				);

				const link = svg
					.append("g")
					.attr("class", "links")
					.selectAll("line")
					.data(this.links)
					.enter()
					.append("line")
					.attr("stroke", "#999")
					.attr("stroke-opacity", 0.6);

				const node = svg
					.append("g")
					.attr("class", "nodes")
					.selectAll("g")
					.data(this.nodes)
					.enter()
					.append("g"); // 使用 g 元素包裹節點和文字

				node.append("circle")
					.attr("r", 5) // 增加節點大小
					.attr("fill", "black")
					.attr("stroke", "white") // 添加邊框顏色
					.attr("stroke-width", 2); // 添加邊框寬度

				// 添加節點名稱
				node.append("text")
					.attr("dy", -15) // 調整文字位置
					.attr("text-anchor", "middle") // 文字居中
					.attr("opacity", 0.5) // 文字透明度
					.text((d) => d.name); // 顯示節點名稱

				this.simulation = d3
					.forceSimulation(this.nodes)
					.force(
						"link",
						d3
							.forceLink()
							.id((d) => d.id)
							.links(this.links)
							.distance((d) => (d.distance ? d.distance : 100)) // {{ edit_1 }}: 設定連結距離
					)
					.force("charge", d3.forceManyBody())
					.force("center", d3.forceCenter(width / 2, height / 2))
					.on("tick", () => {
						link.attr("x1", (d) => d.source.x)
							.attr("y1", (d) => d.source.y)
							.attr("x2", (d) => d.target.x)
							.attr("y2", (d) => d.target.y);

						node.attr(
							"transform",
							(d) => `translate(${d.x}, ${d.y})`
						); // 更新節點位置
					});

				// 添加拖動功能
				const drag = d3
					.drag()
					.on("start", this.dragStarted)
					.on("drag", this.dragged)
					.on("end", this.dragEnded);

				node.call(drag);

				// 添加 hover 高亮功能
				node.on("mouseover", (event, d) =>
					this.mouseOver(event, d, node)
				).on("mouseout", (event, d) => this.mouseOut(event, d, node));
			},
			dragStarted(event, d) {
				// if (!event.active) this.simulation.alphaTarget(0.3).restart();
				if (!event.active) this.simulation.alphaTarget(0.1).restart();
				d.fx = d.x;
				d.fy = d.y;
			},
			dragged(event, d) {
				d.fx = event.x;
				d.fy = event.y;
			},
			dragEnded(event, d) {
				if (!event.active) this.simulation.alphaTarget(0);
				d.fx = null;
				d.fy = null;
			},
			mouseOver(event, d, node) {
				// console.log(this.links);
				// console.log(this.links[0]);
				// console.log(this.links[0].source);
				// console.log(this.links[0].source.id);
				// console.log(d.id);
				// console.log(d.name);
				// console.log(node);
				d3.select(event.currentTarget)
					.select("circle")
					.attr("fill", "orange"); // 懸停節點顏色

				// 降低其他節點的透明度
				node.selectAll("circle").attr("opacity", (n) => {
					// 如果節點不是當前節點且不與當前節點相連，則降低透明度
					return n.id === d.id ||
						this.links.some(
							(link) =>
								(link.source.id === d.id &&
									link.target.id === n.id) ||
								(link.target.id === d.id &&
									link.source.id === n.id)
						)
						? 1
						: 0.2; // 連接的節點保持不變，其他節點降低透明度
				});

				// 增加連結的邊框寬度
				d3.selectAll("line").attr("stroke-width", (link) => {
					return link.source.id === d.id || link.target.id === d.id
						? 2
						: 1; // 懸停時增加邊框寬度
				});
			},
			mouseOut(event, d, node) {
				d3.select(event.currentTarget)
					.select("circle")
					.attr("fill", "black"); // 恢復懸停節點顏色

				// 恢復所有節點的顏色
				node.selectAll("circle").attr("fill", "black");
				node.selectAll("circle").attr("opacity", 1); // 恢復所有節點的透明度

				// 恢復連結的邊框寬度
				d3.selectAll("line").attr("stroke-width", 1); // 恢復邊框寬度
			},
		},
	};
</script>

<style>
	/* 光暗模式樣式設定 */
	:root {
		--graph-bg-color: var(--vp-c-default-3); /* 背景顏色 */
		--graph-border-color: var(--vp-c-gray-2); /* 邊框顏色 */
		--graph-node-fill: var(--vp-c-brand-3); /* 節點填充顏色 */
		--graph-node-stroke: var(--vp-c-white); /* 節點邊框顏色 */
	}

	/* 當前主題為暗色模式時的樣式 */
	@media (prefers-color-scheme: dark) {
		:root {
			--graph-bg-color: var(--vp-c-gray-3); /* 暗色模式背景顏色 */
			--graph-border-color: var(--vp-c-gray-1); /* 暗色模式邊框顏色 */
			--graph-node-fill: var(--vp-c-brand-1); /* 暗色模式節點填充顏色 */
			--graph-node-stroke: var(--vp-c-gray-3); /* 暗色模式節點邊框顏色 */
			/* 暗色模式節點文字顏色 */
		}
	}

	svg {
		background-color: var(--graph-bg-color); /* 使用背景顏色 */
		border: 2px solid var(--graph-border-color); /* 使用邊框顏色 */
		border-radius: 8px; /* 圓角邊框 */
	}

	circle {
		fill: var(--graph-node-fill); /* 使用節點填充顏色 */
		stroke: var(--graph-node-stroke); /* 使用節點邊框顏色 */
		stroke-width: 2; /* 邊框寬度 */
	}

	text {
		fill: var(--vp-c-text-1); /* 使用文字顏色 */
	}
</style>
