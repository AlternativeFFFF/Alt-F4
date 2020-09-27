# Jekyll plugin.
module Jekyll
  module RandomNumberFilter
    def random(max, min=0)
      return rand(min.to_i...max.to_i)
    end
  end
  class RandomNumberTag < Liquid::Tag
    @markup = nil

    def initialize(tag_name, markup, tokens)
      @markup = markup.strip
      super
    end

    def render(context)
      if @markup.empty?
        return get_random_number()
      end
      min, max =  parse_parameters context
      get_random_number(min, max)
    end

    private

    def parse_parameters(context)
      parameters = Liquid::Template.parse(@markup).render context
      parameters.strip!

      if ['"', "'"].include? parameters[0]
        last_quote_index = parameters.rindex(parameters[0])
        min = parameters[1...last_quote_index]
        max = parameters[(last_quote_index + 1)..-1].strip
        return min, max
      end
      parameters.split(/\s+/)
    end

    def get_random_number(min=0, max=100)
      return rand(min.to_i...max.to_i)
    end
  end
end

Liquid::Template.register_filter(Jekyll::RandomNumberFilter)
Liquid::Template.register_tag('random', Jekyll::RandomNumberTag)