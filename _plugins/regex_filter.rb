module Jekyll
  module RegexFilter
    def replace_regex(input, reg_str, repl_str)
      re = Regexp.new reg_str
      input.gsub re, repl_str
    end
    def match_regex(input, reg_str)
      return !Regexp.new(reg_str).match(input).nil?
    end
  end
end

Liquid::Template.register_filter(Jekyll::RegexFilter)