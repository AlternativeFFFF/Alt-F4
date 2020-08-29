require 'rake/clean'

CLEAN.include '_site'

namespace :jekyll do
  desc 'Compile your Jekyll source files'
  task build: :clean do
    sh %{jekyll build --drafts}
  end
end

namespace :test do
  options = { :check_html => true }

  desc 'Test the generated files'
  task :html do
    HTMLProofer.check_directory('./_site', options).run
  end
end

namespace :deploy do
  desc 'Deploy the generated files on GitHub'
  task :pages do
    repo = `git remote get-url origin`.tr("\n","")

    FileUtils.cd('_site', :verbose => true) do
      sh %{rm -rf .git}
      sh %{git init && git add .}
      sh %{git commit -m 'Deploy on GitHub pages'}
      sh %{git push -f #{repo} master:gh-pages}
    end
  end
end