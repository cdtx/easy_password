from setuptools import setup

setup(
    name='easy_password',
    version='0.0.1',
    description='Custom way to handle passwords',
    author='cdtx',
    classifiers=[
        'Programming Language :: Python :: 3.4',
    ],
    packages=['cdtx.django_easy_password'],
    package_data={'cdtx.django_easy_password': ['templates/*',]},
    install_requires = ['djangorestframework']
)


