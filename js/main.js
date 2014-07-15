// <tabs> view-model
var TabsViewModel = can.Map.extend({     
  panels: [],
  active: null,
  addPanel: function( panel ){
    var panels = this.attr("panels");
    panels.push(panel);
    console.log(panels.length);
    panel.attr("visible", false);
    if ( panels.attr("length") === 1 ){
      console.log('activating panel');
      this.activate( panel );
    }
  }, 
  removePanel: function( panel ){
    var panels = this.attr("panels");
    var index = panels.indexOf(panel);
    panels.splice(index, 1);
    if( this.attr("active") === panel ){
      panels.attr("length") ? this.activate(panels[0]) : this.attr("active", null);
    }
  },
  activate: function( panel ){
    var active = this.attr("active");
    if( active !== panel ){
      active && active.attr("visible", false);
      console.log(active && active.attr("visible", false));
      //active.attr("visible", false);
      this.attr("active", panel.attr("visible", true));
    }
  }
});

// <tabs> component
can.Component.extend({
  tag: "tabs",
  scope: TabsViewModel,
  template: "<ul>{{#each panels}}<li can-click='activate'>{{title}}</li>{{/each}}</ul><content />"
});

// <panel> component
can.Component.extend({
  tag: "panel",
  template: "{{#if visible}}<content />{{/if}}",
  scope: { title: "@" },
  events: {
    inserted: function() {
      this.element.parent().scope().addPanel( this.scope );
    },
    removed: function() {
      this.element.parent().scope().addPanel( this.scope );
      //this.element.parent().scope().removePanel( this.scope );
    }
  }
});

// Add to page
var frag = can.view("app-template", {});
console.log($(frag));
$("#my-app").html(frag);
