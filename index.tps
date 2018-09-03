<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
        <style>
        	html,
			body {
			    margin: 0;
			    padding: 0;
			}

			.tools {
			    height: 130px;
			    border: 1px solid #d4d4d4;
			}

			.table {
			    border: 1px solid #d4d4d4;
			    position: absolute;
			    top: 160px;
			    left: 0;
			    right: 0;
			    bottom: 0;
			}
        </style>
    </head>
    <body>
        <input type="hidden" id="auth_key" value="5bebef15-c562-4479-ac57-73f2d0d09eaa">
        <div class="app">
            <div class="tools"></div>
            <div class="table"></div>
        </div>
       <script src="./sunbeam.js"></script>
        <script>
            let ss = new Sunbeam({
                root: '.table',
                toolbar: '.tools'
            })
            ss.setFontColor('rgb(255,0,0)', 'C1')
        </script>
    <script type="text/javascript" src="/sunbeam.js"></script></body>
</html>