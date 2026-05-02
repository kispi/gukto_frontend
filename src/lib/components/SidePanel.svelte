<script lang="ts">
	import {
		ChevronLeft,
		X,
		Share2,
		Bell,
		ChevronDown,
		MessageCircle,
		ChevronUp,
		Sun,
		Moon,
		Search,
	} from 'lucide-svelte'
	import { theme } from '$lib/theme/theme.svelte.js'
	import { toast } from '$lib/ui/toast.svelte'

	let isDetailOpen = $state(false) // 단지 상세 정보가 열렸는지 여부
	let isListExpanded = $state(true) // 리스트가 펼쳐졌는지 여부

	const toggleDetail = () => {
		isDetailOpen = !isDetailOpen
	}

	const toggleList = () => {
		isListExpanded = !isListExpanded
	}
</script>

<aside class="pointer-events-none absolute inset-0 z-30 flex flex-col items-start gap-3 p-4">
	<!-- 1. Floating Search Bar (Always Visible) -->
	<div class="flex w-full items-start justify-between gap-4">
		<div
			class="pointer-events-auto flex h-12 w-full max-w-sidebar items-center gap-2 rounded-lg bg-main px-4 shadow-premium"
		>
			<input
				type="text"
				placeholder="지역, 지하철, 단지명 검색"
				class="w-full bg-transparent text-main outline-none placeholder:text-muted"
				onfocus={() => {
					if (!isDetailOpen) isDetailOpen = true
				}}
			/>
			<div class="flex items-center gap-2">
				<button
					class="cursor-pointer text-orange-500 transition-transform hover:scale-110 active:scale-95"
					onclick={toggleDetail}
				>
					<Search size={20} />
				</button>
			</div>
		</div>

		<!-- Top Right Tools (Theme, etc) -->
		<div class="pointer-events-auto flex items-center gap-2">
			<button
				type="button"
				class="btn-icon cursor-pointer bg-main shadow-premium"
				onclick={() => theme.toggle()}
			>
				{#if theme.current === 'light'}
					<Sun size={20} />
				{:else}
					<Moon size={20} />
				{/if}
			</button>
			<button
				type="button"
				class="btn-icon cursor-pointer bg-main shadow-premium"
				onclick={() => toast.info('알림이 없습니다.')}
			>
				<Bell size={20} />
			</button>
		</div>
	</div>

	<!-- 2. Detail Content (Contextual) -->
	{#if isDetailOpen}
		<div
			class="detail-container pointer-events-auto flex w-full max-w-sidebar flex-col overflow-hidden rounded-lg border border-line bg-panel shadow-premium transition-all duration-300"
			class:expanded={isListExpanded}
			class:collapsed={!isListExpanded}
		>
			<!-- Contextual Header -->
			<div class="bg-orange-500 p-4 text-white dark:bg-orange-600">
				<div class="flex items-center justify-between gap-2">
					<div class="flex items-center gap-2 overflow-hidden">
						<button class="cursor-pointer rounded-lg p-1 transition-colors hover:bg-white/10">
							<ChevronLeft size={20} />
						</button>
						<h2 class="truncate text-lg font-bold">분당 이매동 이매촌1단지금강</h2>
					</div>
					<div class="flex shrink-0 items-center gap-1">
						<button class="cursor-pointer rounded-lg p-2 transition-colors hover:bg-white/10">
							<Share2 size={18} />
						</button>
						<button class="cursor-pointer rounded-lg p-2 transition-colors hover:bg-white/10">
							<Bell size={18} />
						</button>
						<button
							class="cursor-pointer rounded-lg p-2 transition-colors hover:bg-white/10"
							onclick={() => (isDetailOpen = false)}
						>
							<X size={18} />
						</button>
					</div>
				</div>

				<!-- Quick Filters -->
				<div class="mt-4 flex gap-2">
					<button
						class="flex cursor-pointer items-center gap-1 rounded-lg bg-white/20 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/30"
					>
						매매 <ChevronDown size={14} />
					</button>
					<button
						class="flex cursor-pointer items-center gap-1 rounded-lg bg-white/20 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/30"
					>
						30평 <ChevronDown size={14} />
					</button>
					<button
						class="ml-auto flex cursor-pointer items-center gap-1 rounded-lg bg-white/20 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/30"
					>
						406 <MessageCircle size={14} />
					</button>
				</div>
			</div>

			<!-- Toggle Button (List Expander) -->
			<button
				type="button"
				onclick={toggleList}
				class="flex h-8 w-full cursor-pointer items-center justify-center border-b border-line bg-sub text-muted transition-colors hover:bg-line"
			>
				{#if isListExpanded}
					<ChevronUp size={16} />
				{:else}
					<ChevronDown size={16} />
				{/if}
			</button>

			<!-- Collapsible Detail Content -->
			<div
				class="flex-1 overflow-y-auto transition-opacity duration-300 {isListExpanded
					? 'opacity-100'
					: 'pointer-events-none opacity-0'}"
			>
				<!-- 1. Property Summary -->
				<div class="flex flex-col gap-4 border-b border-line p-6">
					<div class="flex items-start justify-between">
						<div class="flex flex-col gap-1">
							<h2 class="text-lg font-bold text-main">경기도 성남시 분당구 삼평동 741</h2>
							<p class="text-sm text-sub">
								142세대 | 2013년 6월(14년차) <br />
								용적률 299% | 건폐율 58%
							</p>
						</div>
						<button
							class="cursor-pointer rounded-lg bg-orange-50 px-3 py-2 text-xs font-bold text-orange-600 transition-colors hover:bg-orange-100"
						>
							3D 단지투어
						</button>
					</div>

					<div class="flex items-center justify-between text-sm">
						<span class="text-sub">삼평동 주간 방문자 8위</span>
						<span class="cursor-pointer font-bold text-orange-500 hover:underline"
							>지금 9명이 보는 중 ></span
						>
					</div>
				</div>

				<!-- 2. Ad Banner (Mock) -->
				<div
					class="flex h-24 cursor-pointer items-center justify-center border-b border-line bg-sub px-6 transition-colors hover:bg-line"
				>
					<div class="flex items-center gap-4 text-sm">
						<div class="h-12 w-12 rounded bg-slate-300"></div>
						<div>
							<p class="font-bold text-main">앉아 볼수록, 도미실</p>
							<p class="text-xs text-sub">부드러운 가죽으로 완성된 편안한 착석감</p>
						</div>
					</div>
				</div>

				<!-- 3. Price Info & Chart -->
				<div class="flex flex-col gap-4 p-6">
					<div class="flex flex-col gap-1">
						<span class="text-xs text-orange-500">최근 실거래 기준 1개월 평균</span>
						<h3 class="text-3xl font-extrabold text-main">29억 5,000</h3>
					</div>

					<!-- Chart Placeholder (SVG) -->
					<div class="relative mt-4 h-48 w-full">
						<svg class="h-full w-full" viewBox="0 0 400 200" preserveAspectRatio="none">
							<!-- Grid Lines -->
							<line
								x1="0"
								y1="50"
								x2="400"
								y2="50"
								stroke="var(--color-line)"
								stroke-dasharray="4"
							/>
							<line
								x1="0"
								y1="100"
								x2="400"
								y2="100"
								stroke="var(--color-line)"
								stroke-dasharray="4"
							/>
							<line
								x1="0"
								y1="150"
								x2="400"
								y2="150"
								stroke="var(--color-line)"
								stroke-dasharray="4"
							/>

							<!-- Trend Line -->
							<path
								d="M0,160 Q100,150 150,110 T300,80 T400,60"
								fill="none"
								stroke="#f97316"
								stroke-width="3"
							/>
							<!-- Points -->
							<circle cx="150" cy="110" r="4" fill="#f97316" />
							<circle cx="400" cy="60" r="5" fill="#f97316" />
						</svg>
						<div class="absolute top-0 right-0 text-[10px] text-orange-500">최고</div>
					</div>
				</div>

				<!-- 4. Transaction Table -->
				<div class="flex flex-col gap-4 border-t border-line p-6">
					<div class="flex items-center justify-between text-xs text-muted">
						<p>국토교통부에서 17분 전 확인</p>
						<div class="flex items-center gap-1">
							<div class="h-2 w-2 rounded-full bg-orange-400"></div>
							<span>저층</span>
						</div>
					</div>

					<div class="space-y-4">
						<div class="flex items-center justify-between border-b border-line pb-4 text-sm">
							<div class="flex flex-col gap-1">
								<span class="text-xs text-muted">계약일</span>
								<span class="font-medium text-main">25.12.02</span>
							</div>
							<div class="flex flex-col gap-1 text-center">
								<span class="text-xs text-muted">면적(공급)</span>
								<span class="font-medium text-main">160A/160B</span>
							</div>
							<div class="flex flex-col items-end gap-1">
								<span class="text-xs text-muted">가격</span>
								<div class="flex items-center gap-2">
									<span class="rounded bg-slate-100 px-1 text-xs dark:bg-slate-800">등기</span>
									<span class="font-bold text-main">29억 5,000</span>
								</div>
								<span class="text-xs text-sub">2동 / 20층</span>
							</div>
						</div>

						<div class="flex items-center justify-between text-sm">
							<div class="flex flex-col gap-1">
								<span class="font-medium text-main">25.06.09</span>
							</div>
							<div class="flex flex-col gap-1 text-center">
								<span class="font-medium text-main">160A/160B</span>
							</div>
							<div class="flex flex-col items-end gap-1">
								<div class="flex items-center gap-2">
									<span class="rounded bg-slate-100 px-1 text-xs dark:bg-slate-800">등기</span>
									<span class="font-bold text-main">25억 5,000</span>
								</div>
								<span class="text-xs text-sub">1동 / 17층</span>
							</div>
						</div>
					</div>

					<button
						class="mt-4 w-full cursor-pointer rounded-lg border border-orange-500 py-3 text-sm font-bold text-orange-500 transition-colors hover:bg-orange-50"
					>
						이 단지 매물 1개 보기
					</button>
				</div>
			</div>
		</div>
	{/if}
</aside>

<style>
	.expanded {
		max-height: calc(100dvh - 120px);
	}
	.collapsed {
		max-height: 140px;
	}
	/* Mobile responsiveness */
	@media (max-width: 768px) {
		/* Mobile bottom sheet implementation would go here */
	}
</style>
