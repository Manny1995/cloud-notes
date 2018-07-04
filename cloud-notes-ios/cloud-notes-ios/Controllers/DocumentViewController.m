//
//  DocumentViewController.m
//  cloud-notes-ios
//
//  Created by Immanuel Amirtharaj on 7/3/18.
//  Copyright © 2018 Immanuel Amirtharaj. All rights reserved.
//

#import "DocumentViewController.h"

@interface DocumentViewController ()

@property(strong, nonatomic) UIActivityIndicatorView *loadingView;

@end

@implementation DocumentViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    self.webView.UIDelegate = self;
    self.webView.navigationDelegate = self;
    
}

-(void) viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    
    self.navigationController.navigationBar.prefersLargeTitles = NO;
    
    self.loadingView = [UIActivityIndicatorView new];
    [self.loadingView setHidesWhenStopped:YES];
    [self.loadingView setTintColor:[UIColor blackColor]];
    [self.loadingView setBounds:self.view.bounds];
    [self.view addSubview:self.loadingView];
    [self.loadingView startAnimating];
    
    [self.webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:self.fileUrl]]];


}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation {
    NSLog(@"Did Finish Navigation");
    [self.loadingView stopAnimating];
}



/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

- (IBAction)onCancel:(id)sender {
    
    [self dismissViewControllerAnimated:YES completion:nil];
}
@end
