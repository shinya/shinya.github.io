var skills  = [
	{
		category : 'Language',
		name : 'Java'
	},
	{
		category : 'Language',
		name : 'Python'
	},
	{
		category : 'Language',
		name : 'C'
	},
	{
		category : 'Language',
		name : 'C++'
	},
	{
		category : 'Language',
		name : 'PHP'
	},
	{
		category : 'Language',
		name : 'C#'
	},
	{
		category : 'Language',
		name : 'COBOL'
	},
	{
		category : 'Language',
		name : 'Perl'
	},
	{
		category : 'Language',
		name : 'Go'
	},

	// Web関係
	{
		category : 'Web',
		name : 'HTML'
	},
	{
		category : 'Web',
		name : 'CSS'
	},
	{
		category : 'Web',
		name : 'Apache'
	},
	{
		category : 'Web',
		name : 'jQuery'
	},
	{
		category : 'Web',
		name : 'IIS'
	},

	// サーバー関係
	{
		category : 'Server',
		name : 'MySQL'
	},
	{
		category : 'Server',
		name : 'Mongo'
	},
	{
		category : 'Server',
		name : 'shell'
	},
	{
		category : 'Server',
		name : 'Vim'
	},


	// OS
	{
		category : 'OS',
		name : 'Windows'
	},
	{
		category : 'OS',
		name : 'Mac OS X'
	},
	{
		category : 'OS',
		name : 'Linux'
	},
	{
		category : 'OS',
		name : 'Android'
	},
	{
		category : 'OS',
		name : 'iOS'
	},


	// 製品関連
	{
		category : 'Product',
		name : 'Photoshop'
	},
	{
		category : 'Product',
		name : 'Illustrator'
	},
	{
		category : 'Product',
		name : 'Dreamweaver'
	},
	{
		category : 'Product',
		name : 'Eclipse'
	},
	{
		category : 'Product',
		name : 'Microsoft Office'
	},


	// その他ツールなど
	{
		category : 'Other',
		name : 'Subversion'
	},
	{
		category : 'Other',
		name : 'Git'
	},
	{
		category : 'Other',
		name : 'Redmine'
	},
];

var labelClass = {
	Web      : {
		className : 'primary',
		labelName : 'info'
	},
	Server   : {
		className : 'warning',
		labelName : 'warning'
	},
	Language : {
		className : 'success',
		labelName : 'success'
	},
	Product  : {
		className : 'danger',
		labelName : 'important'
	},
	OS  : {
		className : 'inverse',
		labelName : 'inverse'
	},
	Other  : {
		className : 'other',
		labelName : 'other'
	}
};