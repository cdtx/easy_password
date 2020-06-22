import os
from setuptools import setup

def recursive(paths, rel='.'):
    l = []
    for path in paths:
        for x, y, z in os.walk(os.path.join(rel, path)):
            if z:
                l.append(os.path.relpath(os.path.join(x, '*'), rel))
    return l

setup(
    name='easy_password',
    version='0.0.1',
    description='Custom way to handle passwords',
    author='cdtx',
    classifiers=[
        'Programming Language :: Python :: 3.4',
    ],
    packages=['cdtx.django_easy_password'],
    package_data={'cdtx.django_easy_password': recursive(['templates', 'static'], rel='cdtx/django_easy_password')},
)


