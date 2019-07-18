(function() {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Colored Box Properties</legend>
				<table>
					<tr>
						<td>Color</td>
						<td><input id="aps_color" type="text" size="42" maxlength="42"></td>
					</tr>
				</table>
			</fieldset>
		</form>
	`;

	class ColoredBoxAps extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							//color: this.color
						}
					}
			}));
		}

		

		get segmentname() {
            console.log("inside aps");
			return " from aps";
		}
	}

customElements.define("com-infy-wm-sol-aps", ColoredBoxAps);
})();