# name: discourse-signatures
# about: A plugin to get that nostalgia signatures (interests) in Discourse Foruns
# version: 0.0.1
# author: Rafael Silva -> Evg <budo@narod.ru>
# url: https://github.com/Toxu-ru/discourse-signatures-master

enabled_site_setting :signatures_enabled

DiscoursePluginRegistry.serialized_current_user_fields << "see_signatures"
DiscoursePluginRegistry.serialized_current_user_fields << "signature_url"
DiscoursePluginRegistry.serialized_current_user_fields << "signature_raw"

after_initialize do

  User.register_custom_field_type('see_signatures', :boolean)
  User.register_custom_field_type('signature_url', :text)
  User.register_custom_field_type('signature_raw', :text)

  if SiteSetting.signatures_enabled then
    add_to_serializer(:post, :user_signature, false) {
      if SiteSetting.signatures_advanced_mode then
        object.user.custom_fields['signature_raw'] if object.user
      else
        object.user.custom_fields['signature_url'] if object.user
      end
    }

    # I guess this should be the default @ discourse. PR maybe?
    add_to_serializer(:user, :custom_fields, false) {
      if object.custom_fields == nil then
        {}
      else
        object.custom_fields
      end
    }
  end
end

register_asset "javascripts/discourse/templates/connectors/user-custom-preferences/signature-preferences.hbs"
