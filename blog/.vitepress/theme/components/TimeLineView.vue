<template>
	<div class="timeline-container">
		<h1 class="timeline-title">{{ title }}</h1>
		<div class="timeline">
			<div
				v-for="(item, index) in timelineData"
				:key="index"
				class="timeline-item"
				:class="{ 'timeline-item-right': index % 2 === 0 }"
			>
				<div class="timeline-content">
					<h3 class="timeline-content-title">{{ item.title }}</h3>
					<div class="timeline-date">{{ formatDate(item.date) }}</div>
					<p class="timeline-content-desc">{{ item.description }}</p>
				</div>
				<div
					class="timeline-dot"
					:class="{ 'timeline-dot-yellow': index % 2 === 0 }"
				></div>
			</div>
		</div>
	</div>
</template>

<script>
	import { milestoneData } from "../milestoneData.js";

	export default {
		props: {
			title: {
				type: String,
				default: milestoneData.title,
			},
			timelineData: {
				type: Array,
				default: milestoneData.timelineData,
			},
		},
		methods: {
			formatDate(dateString) {
				const options = {
					year: "numeric",
					month: "long",
					day: "numeric",
				};
				return new Date(dateString).toLocaleDateString(
					undefined,
					options
				);
			},
		},
	};
</script>

<style scoped>
	.timeline-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		border: 0.1em solid #1a1a1a;
		border-radius: 0.5em;
	}

	.timeline-title {
		font-size: 2rem;
		font-weight: bold;
		color: #1a1a1a;
		margin-bottom: 3rem;
	}

	.timeline {
		position: relative;
		padding: 2rem 0;
	}

	.timeline::before {
		content: "";
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 2px;
		height: 100%;
		background-color: #e5e5e5;
	}

	.timeline-item {
		position: relative;
		margin-bottom: 3rem;
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}

	.timeline-item-right {
		justify-content: flex-start;
	}

	.timeline-content {
		width: 45%;
		padding: 1.5rem;
		background: white;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		position: relative;
		transition: all 0.3s ease;
	}

	.timeline-content:hover {
		transform: translateY(-5px);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
	}

	.timeline-item-right .timeline-content {
		text-align: left;
	}

	.timeline-date {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		background-color: #f7fafc;
		border-radius: 15px;
		font-size: 0.875rem;
		color: #4a5568;
		/* margin-bottom: 0.75rem; */
		font-weight: 500;
		border: 1px solid #e2e8f0;
	}

	.timeline-content-title {
		font-size: 1.25rem;
		font-weight: 600;
		color: #2d3748;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.timeline-content-desc {
		color: #4a5568;
		line-height: 1.6;
	}

	.timeline-dot {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background-color: #3182ce;
		border: 3px solid white;
		box-shadow: 0 0 0 3px #3182ce33;
	}

	.timeline-dot-yellow {
		background-color: #ecc94b;
		box-shadow: 0 0 0 3px #ecc94b33;
	}

	@media (max-width: 768px) {
		.timeline::before {
			left: 0;
		}

		.timeline-item,
		.timeline-item-right {
			justify-content: flex-start;
			padding-left: 2rem;
		}

		.timeline-content {
			width: calc(100% - 2rem);
		}

		.timeline-dot {
			left: 0;
		}
	}
</style>
