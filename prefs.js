const Gtk = imports.gi.Gtk;
let Extension = imports.misc.extensionUtils.getCurrentExtension();
let Settings = Extension.imports.settings;

function init() {}

function buildPrefsWidget() {
  let config = new Settings.Prefs();
  let frame = new Gtk.Box({
    orientation: Gtk.Orientation.VERTICAL,
    border_width: 10,
  });

  (function () {
    let radiusHbox = new Gtk.Box({
      orientation: Gtk.Orientation.HORIZONTAL,
      spacing: 20,
    });

    let radiusLabel = new Gtk.Label({
      label: "Border radius\n<small>in px</small>",
      use_markup: true,
    });
    let radiusAdjustment = new Gtk.Adjustment({
      lower: 0,
      upper: 30,
      step_increment: 1,
    });
    let radiusScale = new Gtk.HScale({
      digits: 0,
      adjustment: radiusAdjustment,
      value_pos: Gtk.PositionType.RIGHT,
      round_digits: 0,
    });

    radiusHbox.add(radiusLabel);
    radiusHbox.pack_end(radiusScale, true, true, 0);

    frame.add(radiusHbox);

    let radiusScalingHbox = new Gtk.Box({
      orientation: Gtk.Orientation.HORIZONTAL,
      spacing: 20,
    });

    let radiusScalingLabel = new Gtk.Label({
      label: "Border radius scaling",
      use_markup: true,
    });

    let radiusScalingInput = new Gtk.Entry({});

    radiusScalingHbox.add(radiusScalingLabel);
    radiusScalingHbox.pack_end(radiusScalingInput, true, true, 0);

    frame.add(radiusScalingHbox);

    var radiusPref = config.RADIUS;
    radiusScale.set_value(radiusPref.get());
    radiusScale.connect("value-changed", function (sw) {
      var oldval = radiusPref.get();
      var newval = sw.get_value();
      if (newval != radiusPref.get()) {
        radiusPref.set(newval);
      }
    });

    var radiusScalingPref = config.RADIUS_SCALING;
    radiusScalingInput.set_text(radiusScalingPref.get().toString());
    radiusScalingInput.connect("changed", function (sw) {
      var oldval = radiusPref.get();
      var newval = parseFloat(sw.get_text()) || 1;
      if (newval != radiusScalingPref.get()) {
        radiusScalingPref.set(newval);
      }
    });
  })();
  frame.show_all();
  return frame;
}
