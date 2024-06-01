<?php
class Message extends CRUD
{

	function __construct()
	{
		$this->table = 'message';

		parent::__construct();
	}
	
}
