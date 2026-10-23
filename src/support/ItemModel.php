<?php

namespace support;

class ItemModel
{
    protected static array $item = [];

    protected static array $setting = [];

    public static function setItem($item): void
    {
        self::$item = $item;
    }

    public static function setSetting($setting = []): void
    {
        self::$setting = $setting ?? [];
    }

    public static function getTitle(): string
    {
        return nl2br(self::$item['title']);
    }

    public static function getSubtitle(): string
    {
        return nl2br(self::$item['subtitle']);
    }
}