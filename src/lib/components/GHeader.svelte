<script lang="ts">
	import { Search, Menu } from 'lucide-svelte'
</script>

<header
	class="g-header absolute left-0 top-0 z-10 flex w-full items-center justify-between p-4 pointer-events-none"
>
	<div class="pointer-events-auto flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-lg w-full max-w-md mx-auto md:mx-0">
		<Menu class="h-5 w-5 text-slate-500 cursor-pointer hover:text-slate-900 transition-colors" />
		<div class="h-6 w-px bg-slate-200 mx-2"></div>
		<input
			type="text"
			placeholder="아파트, 지역, 지하철역 검색"
			class="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
		/>
		<button class="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 transition-colors">
			<Search class="h-4 w-4" />
		</button>
	</div>
</header>
