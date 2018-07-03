//
//  DocumentViewController.h
//  cloud-notes-ios
//
//  Created by Immanuel Amirtharaj on 7/3/18.
//  Copyright © 2018 Immanuel Amirtharaj. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>

@interface DocumentViewController : UIViewController <WKUIDelegate>

@property (strong, nonatomic) IBOutlet WKWebView *webView;
@property(copy, nonatomic) NSString *documentTitle;
@property(copy, nonatomic) NSString *fileUrl;

- (IBAction)onCancel:(id)sender;

@end
