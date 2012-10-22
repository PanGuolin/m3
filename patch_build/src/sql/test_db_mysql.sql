create database patch_build;

create user 'patchbuild' identified by 'patchbuild';

Grant all on patch_build.* TO patchbuild;