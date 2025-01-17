<script lang="ts">
	import type { Node } from "./Node.js";

    interface Props{
        node:Node
    }

    const {node}:Props = $props()
</script>

<div>
    {node.id}
</div>