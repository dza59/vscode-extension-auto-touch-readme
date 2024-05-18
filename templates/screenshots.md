## :camera: Screenshots

{{#each screenshots}}
[![{{this.altText}}][{{this.label}}]]()
{{/each}}

{{#each screenshots}}
[{{this.label}}]: {{this.path}}
{{/each}}
