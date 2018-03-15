<template>
	<div class="cell" :style="cellPosi">
        <div class="cell-content" :style="cellProps">
			{{texts}}
		</div>
	</div>
</template>
<script type="text/javascript">
import {unit} from '../filters/unit'
export default {
    props: ['item'],
    computed: {
    	cellPosi(){
    		const physicsBox = this.item.physicsBox;
    		return  {
    			top: unit(physicsBox.top - 1),
				left: unit(physicsBox.left - 1), 
				width: unit(physicsBox.width), 
				height: unit(physicsBox.height)
    		}
    	},
        cellProps() {
        	const cellContent = this.item.content,
            isItalic = cellContent.italic ? 'italic ' : '';
            return  {
            	background: cellContent.background, 
				font: unit(cellContent.size) +' '+ cellContent.family, 
				color: cellContent.color, 
				textAlign: cellContent.alignRow, 
				textDecoration: cellContent.underline, 
				verticalAlign: cellContent.alignCol
            }
        },
        texts(){
        	return this.item.content.texts	
        }
    },
    filters:{
    	unit
    }
};
</script>
<style type="text/css">
	.cell {
        position: absolute;
		overflow: hidden;
		cursor: default;
		border: 1px solid transparent;
	}
	.cell-content {
		display: table-cell;
		height: inherit;
		width: inherit;
	}
</style>