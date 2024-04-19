# pet-clinic

Admin UI application powered by ReactAdmin and created by Amplicode.

## Next steps

### Install the application dependencies:

```sh
npm install
```

### Install Amplicode Frontend VS Code extension

[Installation instruction](https://amplicode.io)

### Create backend logic

You can create special Spring CRUD Controllers, that are perfectly fit to [project dataProvider](src/springDataProvider.ts). Each controller corresponds to Resource in ReactAdmin terms.

Read more about [Data Providers](https://marmelab.com/react-admin/Architecture.html#providers) and [Resources](https://marmelab.com/react-admin/Resource.html).

### Register resources and create pages for them

If you run Amplicode Backend, Amplicode Frontend will automatically detect your Resources in Amplicode Explorer. 

![Explorer](https://github.com/Amplicode/amplicode-create-app/blob/master/media/amplicode_frontent_explorer.png?raw=true)

You can register such Resources and create pages for them by using special wizards.

![Wizard](https://github.com/Amplicode/amplicode-create-app/blob/master/media/page_wizard.png?raw=true)

### Fill pages with contents

Use Storybook Palette and Preview to look for recipes and use cases. Most of the Stories can be inserted to your source code.

![Storybook](https://github.com/Amplicode/amplicode-create-app/blob/master/media/storybook.png?raw=true)

### Run and test application

Start dev server via terminal command

```sh
npm run dev
```

or by <b>Run and Debug</b> panel in VS Code.

### Production

Build the application in production mode by running:

```sh
npm run build
```