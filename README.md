# Blockly Events

This Blockly plugin tries to improve blockl's native event system by providing an additional Event-API. 

## Install with Bower

```
bower install --save blockly-events
```

## Add to HTML

Add `events.js` to your `index.html` before all scripts, you want to use the Events in but *after all the other blockly scripts*.

```
<script src="bower_components/blockly-shadow-autoreplacer/shadow-autoreplacer.js"></script>
```


## Usage
This plugin is mostly developed for usage in our products which are running in an embedded chromium and don't need
to work in other browsers. So beware that it might not work as intended in other browsers.

After inclusion there is an `BlocklyPlugins.Events` which provides the following methods for registering callbacks:

- load(cb)
    - Called on document load.
- unload(cb)
    - Called on document unloading.
- beforeUnload(cb)
    - Called just before document unloading.
- ready(cb)
    - Called when Blockly's mainWorkspace is ready.
- docReady(cb)
    - Called when document is ready. (similar to $(document).ready)

Where cb is a callback, that is called at the event.

```
BlocklyPlugins.Events.ready(function(){
    alert("Workspace ready!");
});
```
