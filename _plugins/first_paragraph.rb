#
# Jekyll plugin that adds the `first_paragraph` Liquid filter, which returns
# only the first paragraph of an HTML string.
#

require 'nokogiri'


module Jekyll
  module AssetFilter
    def first_paragraph(html)
      paragraph = Nokogiri::HTML(html).css('p').first.to_html
    end
  end
end


Liquid::Template.register_filter(Jekyll::AssetFilter)