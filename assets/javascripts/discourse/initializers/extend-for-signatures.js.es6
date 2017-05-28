import { withPluginApi } from 'discourse/lib/plugin-api';
import RawHtml from 'discourse/widgets/raw-html';
import { cook } from 'discourse/lib/text';

function attachSignature(api) {
  api.includePostAttributes('user_signature');

  api.decorateWidget('poster-name:after', dec => {

    const attrs = dec.attrs;
    if (Ember.isEmpty(attrs.user_signature)) { return; }

   // const currentUser = api.getCurrentUser();
    const siteSettings = Discourse.SiteSettings; // TODO: change way to get the sitesettings
    
   //   const enabled = currentUser.get('custom_fields.see_signatures');
      
        if (siteSettings.signatures_advanced_mode) {
   // return [dec.h('hr'), dec.h('div', new RawHtml({html: `<div class='user-signature'>${cook(attrs.user_signature)}</div>`}))];
       return new RawHtml({html: `<div class='user-signature'>${attrs.user_signature}</div>`});
        } else {
          var signt = `${attrs.user_signature}`.replace(/[^\p{Alnum} ,]+/g, "");
          return new RawHtml({html: `<div class='user-signature'>${signt}</div>`});
          
          //return new RawHtml({html: `<div class='user-signature'>${attrs.user_signature}</div>`});
        }
   // if (enabled) {}
   // if (currentUser) {}
  });
}

export default {
  name: 'extend-for-signatures',
  initialize(container) {
    const siteSettings = container.lookup('site-settings:main');
    if (siteSettings.signatures_enabled) {
      withPluginApi('0.1', attachSignature);
    }
  }
};
