(function(config, models, views, routers, utils, templates) {

views.Load = Backbone.View.extend({
  id: 'load',

  events: {
    'click .load-dataset': 'onLoadDataset'
  },

  onLoadDataset: function(e) {
    var self = this;
    e.preventDefault();
    var $form = $(e.target).closest('form');
    // var url = $form.find("input[name=source]").first().val();
    var data = {};
    _.each($form.serializeArray(), function(item) {
      data[item.name] = item.value;
    });
    // special case for file form
    var $files = $form.find('input[type="file"]');
    if ($files.length > 0) {
      data.file = $files[0].files[0]
    }
    var project = new models.Project();
    project.loadSourceDataset(data, function(err) {
      if (err) {
        // this.notify('error', 'The requested resource could not be found.');
      }
      self.trigger('load', project);
    });
    return false;
  },

  initialize: function(options) {
    this.$el = $(this.el);
  },

  render: function() {
    var rendered = _.template(this.template, {});
    this.$el.html(rendered);
    return this;
  },
  
  template: ' \
    <div class="view load"> \
      <h2>Load Data</h2> \
      <div class="tabbable"> \
        <ul class="nav nav-tabs"> \
          <li class="active"> \
            <a href="#gdocs" data-toggle="tab">Google Docs Spreadsheet</a> \
          </li> \
          <li> \
            <a href="#github" data-toggle="tab">GitHub CSV</a> \
          </li> \
          <li> \
            <a href="#csv-disk" data-toggle="tab">Load from CSV on disk</a> \
          </li> \
        </ul> \
        <div class="tab-content"> \
          <div class="tab-pane active" id="gdocs"> \
            <form class="form-horizontal"> \
              <input type="hidden" name="backend" value="gdocs" /> \
              <fieldset> \
                <div class="control-group"> \
                  <label for="url" class="control-label">URL</label> \
                  <div class="controls"> \
                    <input type="text" name="url" class="input span6" placeholder="URL to sheet" /> \
                    <p class="help-block"> \
                      To load the spreadsheet you must have "published" it (see: File Menu -> Publish to the Web) \
                    </p> \
                  </div> \
                </div> \
              </fieldset> \
              <div class="form-actions"> \
                <button type="submit" class="btn btn-primary load-dataset">Load</button> \
              </div> \
            </form> \
          </div> \
          <div class="tab-pane" id="github"> \
            <form class="form-horizontal"> \
              <input type="hidden" name="backend" value="github" /> \
              <fieldset> \
                <div class="control-group"> \
                  <label for="url" class="control-label">GitHub CSV URL</label> \
                  <div class="controls"> \
                    <input type="text" name="url" class="input span6" placeholder="URL to CSV on GitHub" value="https://github.com/datasets/transformer-test/blob/master/data/data.csv" /> \
                  </div> \
                </div> \
              </fieldset> \
              <div class="form-actions"> \
                <button type="submit" class="btn btn-primary load-dataset">Load</button> \
              </div> \
            </form> \
          </div> \
          <div class="tab-pane" id="csv-disk"> \
            <form class="form-horizontal"> \
              <input type="hidden" name="backend" value="csv" /> \
              <div class="control-group"> \
                <label class="control-label">File</label> \
                <div class="controls"> \
                  <input type="file" name="file" /> \
                </div> \
              </div> \
              <div class="control-group"> \
                <label class="control-label">Separator</label> \
                <div class="controls"> \
                  <input type="text" name="delimiter" value="," class="spam1"/> \
                </div> \
              </div> \
              <div class="control-group"> \
                <label class="control-label">Text delimiter</label> \
                <div class="controls"> \
                  <input type="text" name="quotechar" value=\'"\' /> \
                </div> \
              </div> \
              <div class="control-group"> \
                <label class="control-label">Encoding</label> \
                <div class="controls"> \
                  <input type="text" name="encoding" value="UTF-8" /> \
                </div> \
              </div> \
              <div class="form-actions"> \
                <button type="submit" class="btn btn-primary load-dataset">Load</button> \
              </div> \
            </form> \
          </div> \
        </div> \
    </div> \
  </div> \
  '
});

}).apply(this, window.args);
